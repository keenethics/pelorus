Template._goal.events({
  'click .js-edit-goal': function(e) {
    e.preventDefault();
    if (!Meteor.user()) return Template.modal.showLoginAlert();

    let data = { milestone: this.milestone, goal: this.goal };
    Template.modal.show({title: 'Edit Goal', template: '_goalsForm', data});
  },
  'click .js-goal-completed': function(e) {
    e.preventDefault();
    if (!Meteor.user()) return Template.modal.showLoginAlert();
    Meteor.call('toggleGoalCompletion', this.goal._id);
  }
});
