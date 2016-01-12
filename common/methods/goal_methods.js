Meteor.methods({
  toggleGoalCompletion: function(goalId) {
    check(goalId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        'forbidden-action',
        'Can\'t toggle goal completion. User must be logged in.'
      );
    }

    const goal = Goals.findOne({
      _id: goalId,
      userId: this.userId
    });

    if (!goal) {
      throw new Meteor.Error(
        'forbidden-action',
        'Can\'t toggle goal completion. Goal is not found.'
      );
    }

    return Goals.update({
      _id: goalId,
      userId: this.userId
    }, {
      $set: {
        completed: !goal.completed
      }
    });
  },

  removeGoal: function(goalId) {
    check(goalId, String);

    const goal = Goals.findOne(goalId);

    if (this.userId !== goal.userId || goal.children().count()) {
      throw new Meteor.Error('forbidden-action', 'Goal can\'t be removed.');
    }

    return Goals.remove(goalId);
  },

  updateGoal: function(goalId, data) {
    check(goalId, String);
    check(data, {
      title: String,
      rank: Number,
      parentId: Match.OneOf(String, null),
      completedPct: Number
    });

    if (Goals.find({_id: goalId, userId: this.userId}).count() === 0) {
      throw new Meteor.Error('forbidden-action', 'Goal doesn\'t exist.');
    }

    return Goals.update({_id: goalId}, {$set: data});
  },

  insertGoal: function(data) {
    check(data, {
      title: String,
      rank: Number,
      parentId: Match.OneOf(String, null),
      milestoneId: String,
      completedPct: Number
    });

    let goalData = _.extend(data, {userId: this.userId});

    return Goals.insert(goalData);
  }

});
