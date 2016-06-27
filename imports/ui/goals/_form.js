import './_form.html';
import { Goals } from '/imports/api/goals/goals.js';

Template._goalsForm.onCreated(function() {
  this.rank = new ReactiveVar(this.data.goal && this.data.goal.rank);
  this.parentId = new ReactiveVar(this.data.goal && this.data.goal.parentId);
  this.error = new ReactiveVar(null);
});

Template._goalsForm.onRendered(function() {
  $('#formModal').one('shown.bs.modal', () => $('[name=title]').focus());

  if(!this.data.goal._id) {
    this.autorun(() => {
      let parentId = this.parentId.get();
      let parentPriority = (Goals.findOne(parentId) || {}).rank;
      this.rank.set(parentPriority || this.data.stage.newGoalRank());
    });
  }
});

Template._goalsForm.helpers({
  parents: function() {
    return this.stage.parent() && this.stage.parent().goals();
  },
  canDelete: function() {
    return this.goal._id && this.goal.children().count() === 0;
  }
});

Template._goalsForm.events({
  'click .js-save': function(e, t) {
    let stageId = this.stage._id;
    let data    = t.$('form').serializeJSON();

    //TODO: use same handler in stages form
    let handler = (error) => {
      if (!error) return $('#formModal').modal('hide');
      t.error.set(error ? error.reason : null);
      t.$('.form-group').removeClass('has-error');
      JSON.parse(error.details).map(field => {
        $(`[name^=${field.name}]`).parent('.form-group').addClass('has-error')
      });
    };

    if (this.goal._id) {
      Meteor.call('updateGoal', this.goal._id, data, handler);
    } else {
      Meteor.call('insertGoal', _.extend({stageId}, data), handler);
    }
  },
  'click .js-remove-goal': function(e) {
    e.preventDefault();
    Meteor.call('removeGoal', this.goal._id);
    $('#formModal').modal('hide');
  },
  'change #parentId': function(e, t) {
    t.parentId.set(e.currentTarget.value);
  },
  'change #rank': function(e, t) {
    t.rank.set(Number(e.currentTarget.value));
  }
});
