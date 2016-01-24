Meteor.methods({
  toggleGoalCompletion: function(goalId) {
    check(goalId, String);

    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    const goal = Goals.findOne({
      _id: goalId,
      userId: this.userId
    });

    if (!goal) throw new Meteor.Error('forbidden-action', 'Goal not found');

    return Goals.update({
      _id: goalId,
      userId: this.userId
    }, {
      $set: {
        progress: goal.progress == 100 ? 0 : 100
      }
    });
  },

  removeGoal: function(goalId) {
    check(goalId, String);

    const goal = Goals.findOne(goalId);

    if (this.userId !== goal.userId || goal.children().count()) {
      throw new Meteor.Error('forbidden-action', 'Goal can\'t be removed');
    }

    return Goals.remove(goalId);
  },

  updateGoal: function(goalId, data) {
    check(goalId, String);
    check(data, {
      title: String,
      rank: Number,
      parentId: Match.OneOf(String, null),
      progress: Number
    });

    if (Goals.find({_id: goalId, userId: this.userId}).count() === 0) {
      throw new Meteor.Error('forbidden-action', 'Goal not found');
    }

    return Goals.update(goalId, {$set: data});
  },

  insertGoal: function(data) {
    check(data, {
      title: String,
      rank: Number,
      parentId: Match.OneOf(String, null),
      stageId: String,
      progress: Number
    });

    return Goals.insert(_.extend(data, {userId: this.userId}));
  }

});
