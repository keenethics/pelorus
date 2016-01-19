Template._goal.events({
  'click .js-edit-goal': function(e) {
    if (!Meteor.user()) return;
    e.preventDefault();
    Template._formModal.show({
      title: 'Edit Goal',
      template: '_goalsForm',
      data: { milestone: this.milestone, goal: this.goal }
    });
  },
  'click .js-goal-completed': function() {
    if (!Meteor.user()) return;
    Meteor.call('toggleGoalCompletion', this.goal._id);
  },

  'click .js-remove-goal': function(e) {
    if (!Meteor.user()) return;
    e.preventDefault();
    Meteor.call('removeGoal', this.goal._id);
  }
});
