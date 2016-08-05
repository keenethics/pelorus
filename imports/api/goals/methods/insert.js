import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Goals } from '/imports/api/goals/goals.js'

export const insertGoal = new ValidatedMethod({
  name: 'goal.insert',
  validate({ goalData }) {
    check(goalData, {
      title: String,
      rank: Number,
      parentId: Match.Optional(Match.OneOf(String, null)),
      stageId: String,
      progress: Number,
    });
  },
  run({ goalData }) {

    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }
    const goalId = Goals.insert(_.extend(goalData, { userId: this.userId }));
    return goalId;
  }
});
