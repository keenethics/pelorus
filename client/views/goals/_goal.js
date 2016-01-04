Template._goal.events({
  'click .js-edit-goal': function(e) {
    e.preventDefault();
    Template._formModal.show({
      'title': 'Edit Goal',
      'template': '_goalsForm',
      'data': { 'milestone': this.milestone, 'goal': this.goal }
    });
  },

  'click .js-goal-completed': function(e, tpl) {
    // const goal = Blaze.getData(e.currentTarget);
    const {
      _id,
      completed
    } = tpl.data.goal;

    Meteor.call('updateGoalCompletion', _id, !completed);
  }
});
