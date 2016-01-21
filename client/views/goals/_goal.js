Template._goal.events({
  'click .js-edit-goal': function(e) {
    e.preventDefault();
    if (!Meteor.user()) {
      return Template.modal.show({
        template: 'forUnregistered',
        title: 'Welcome'
      });
    }
    Template.modal.show({
      title: 'Edit Goal',
      template: '_goalsForm',
      data: { milestone: this.milestone, goal: this.goal }
    });
  },
  'click .js-goal-completed': function(e) {
    e.preventDefault();
    if (!Meteor.user()) {
      return Template.modal.show({
        template: 'forUnregistered',
        title: 'Welcome'
      });
    }
    Meteor.call('toggleGoalCompletion', this.goal._id);
  },

  'click .js-remove-goal': function(e) {
    e.preventDefault();
    if (!Meteor.user()) {
      return Template.modal.show({
        template: 'forUnregistered',
        title: 'Welcome'
      });
    }
    Meteor.call('removeGoal', this.goal._id);
  }
});
