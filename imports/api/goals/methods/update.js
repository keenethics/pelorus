import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { Goals } from '/imports/api/goals/goals.js'


export const updateGoal = new ValidatedMethod({
  name: 'goal.update',
  validate({ goalId, data }) {
    check(goalId, String)
    check(data, {
      title: String,
      rank: Number,
      parentId: Match.Optional(Match.OneOf(String, null)),
      progress: Number,
    });
  },
  run({ goalId, data }) {
    if (Goals.find({ _id: goalId, userId: this.userId }).count() === 0) {
      throw new Meteor.Error('forbidden-action', 'Goal not found');
    }

    return Goals.update(goalId, { $set: data });
  },
})