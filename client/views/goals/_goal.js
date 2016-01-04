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

    const { _id } = this.goal;

    Meteor.call('removeGoal', _id);
  }
});
