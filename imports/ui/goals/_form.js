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
  // parents: function() {
  //   return this.stage.parent() && this.stage.parent().goals();
  // },
  // canDelete: function() {
  //   return this.goal._id && this.goal.children().count() === 0;
  // }
});

Template._goalsForm.events({
  'change #parentId': function(e, t) {
    t.parentId.set(e.currentTarget.value);
  },

  'change #rank': function(e, t) {
    t.rank.set(Number(e.currentTarget.value));
  }
});
