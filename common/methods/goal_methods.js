Meteor.methods({
  'updateGoalCompletion': function(goalId, completed) {
    check(goalId, String);
    check(completed, Boolean);

    return Goals.update({
      '_id': goalId,
      'userId': this.userId
    }, {
      '$set': {
        'completed': completed
      }
    });
  },

  'removeGoal': function(goalId) {
    check(goalId, String);

    const goal = Goals.findOne(goalId);
    let result;

    if (this.userId === goal.userId && !goal.children().count()) {
      result = Goals.remove(goalId);
    }

    return result;
  }
});
