Template._goalsForm.onCreated(function() {
  this.rank = new ReactiveVar(this.data.goal && this.data.goal.rank);
  this.parentId = new ReactiveVar();
});

Template._goalsForm.onRendered(function() {
  this.autorun(() => {
    let parentId = this.parentId.get();
    let parentPriority = (Goals.findOne(parentId) || {}).rank;
    this.rank.set(parentPriority || this.data.stage.newGoalRank());
  });
});

Template._goalsForm.helpers({
  parents: function() {
    return this.stage.parent() && this.stage.parent().goals();
  },
  canDelete: function() {
    return this.goal._id && this.goal.children().count() == 0;
  }
});

Template._goalsForm.events({
  'click .js-save': function(e, t) {
    let $title = t.$('#title');
    let title = $title.val();

    let parentId = t.parentId.get() || null;
    let progress = Number(t.$('#progress').val());

    //TODO: move validations to meteor method
    if (!title) return $title.parent('.form-group').addClass('has-error');
    if (progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
    }

    let data = { title, progress, parentId, rank: t.rank.get() };
    if (this.goal._id) {
      Meteor.call('updateGoal', this.goal._id, data);
    } else {
      Meteor.call('insertGoal', _.extend({stageId: this.stage._id}, data));
    }

    $('#formModal').modal('hide');
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
