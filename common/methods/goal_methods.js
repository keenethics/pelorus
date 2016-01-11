Meteor.methods({
  'toggleGoalCompletion': function(goalId) {
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
      '_id': goalId,
      'userId': this.userId
    }, {
      '$set': {
        'completed': !goal.completed
      }
    });
  },

  'removeGoal': function(goalId) {
    check(goalId, String);

    const goal = Goals.findOne(goalId);

    if (this.userId !== goal.userId || goal.children().count()) {
      throw new Meteor.Error('forbidden-action', 'Goal can\'t be removed.');
    }

    return Goals.remove(goalId);
  },

  'updateGoal': function(goalId, data) {
    check(goalId, String);
    check(data, {
      'title': String,
      'rank': Number,
      'milestoneId': String,
      'userId': String,
      'completedPct': Number
    });

    const goal = Goals.findOne(goalId);

    if (this.userId !== goal.userId) {
      throw new Meteor.Error('forbidden-action', 'Goal can\'t be changed.');
    }

    return Goals.update({'_id': goalId}, {'$set': data});
  },

  'insertGoal': function(data) {
    check(data, {
      'title': String,
      'rank': Number,
      'milestoneId': String,
      'userId': String,
      'completedPct': Number
    });

    return Goals.insert(data);
  }

});
