Meteor.methods({
  'updateGoalCompletion': function(goalId, completed) {
    check(goalId, String);
    check(completed, Boolean);

    return Goals.update({
      _id: goalId,
      userId: this.userId
    }, {
      $set: {
        completed: completed
      }
    });
  }
});
