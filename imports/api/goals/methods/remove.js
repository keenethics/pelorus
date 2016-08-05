import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { Goals } from '/imports/api/goals/goals.js'


export const removeGoal = new ValidatedMethod({
  name: 'goal.remove',
  validate({ goalData }) {
    console.log('valuidate')
    console.log(goalData)
    check(goalData, {
      _id: String,
      title: String,
      rank: Number,
      parentId: Match.Optional(Match.OneOf(String, null)),
      stageId: String,
      userId: String,
      progress: Number,
    });
  },
  run({ goalData }) {
    if (this.userId !== goalData.userId || Goals.findOne({_id: goalData._id}).children().count()) {
      throw new Meteor.Error('forbidden-action', 'Goal can\'t be removed');
    }
    return Goals.remove({ _id: goalData._id });
  }
})
 