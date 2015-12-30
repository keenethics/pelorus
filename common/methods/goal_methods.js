Meteor.methods({
  'updateGoalCompletion': function(goalId, completed) {
    return Goals.update(goalId, {
      $set: {
        completed: completed
      }
    });
  }
});
