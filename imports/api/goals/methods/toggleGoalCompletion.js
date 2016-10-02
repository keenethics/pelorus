import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { Goals } from '/imports/api/goals/goals.js'

export const toggleGoalCompletion = new ValidatedMethod({
  name: 'goal.completion',
  validate({ goalId }){
    check(goalId, String);
  },
  run({ goalId }) {
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
  }
});
