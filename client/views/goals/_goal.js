Template._goal.events({
  'click .js-edit-goal': function(e) {
    e.preventDefault();
    Template._formModal.show({
      'title': 'Edit Goal',
      'template': '_goalsForm',
      'data': { 'milestone': this.milestone, 'goal': this.goal }
    });
  },

  'click .js-remove-goal': function(e) {
    e.preventDefault();

    Meteor.call('removeGoal', this.goal._id);
  }
});
