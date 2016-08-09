import { Meteor } from 'meteor/meteor';
import { Goals } from './goals.js';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';

Meteor.methods({
  toggleGoalCompletion(goalId) {
    check(goalId, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }
    const goal = Goals.findOne({
      _id: goalId,
      userId: this.userId,
    });

    if (!goal) throw new Meteor.Error('forbidden-action', 'Goal not found');

    return Goals.update({
      _id: goalId,
      userId: this.userId,
    }, {
      $set: {
        progress: goal.progress === 100 ? 0 : 100,
      },
    });
  },
});
