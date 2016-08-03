import { Meteor } from 'meteor/meteor';
import { Stages } from './stages.js';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const addStage = new ValidatedMethod({
  name: 'stages.addStage',
  validate({ params, copyGoals }) {
    check(params, { type: String, period: String });
    check(copyGoals, Match.Optional(Boolean));
  },
  run({ params, copyGoals }) {
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    const locale = Meteor.user().profile.language;
    const bounds = Stages.boundsFor(params.period, params.type, locale);
    const data = _.extend(params, bounds, { userId: this.userId });

    if (params.type !== 'years' && !Stages._transform(data).parent()) {
      throw new Meteor.Error('period-invalid', 'Parent stage needed');
    }
    if (Stages._transform(data).siblings().count() > 0) {
      throw new Meteor.Error('period-invalid', 'Period intersection detected');
    }

    const stageId = Stages.insert(data);

    if (copyGoals && params.type !== 'years') {
      Stages.findOne(stageId).parent()
        .goals({ progress: { $ne: 100 } })
        .map(goal => goal.createChild(stageId));
    }

    return stageId;
  }
});


// Meteor.methods({
//   addStage(params, copyGoals) {
//     check(params, { type: String, period: String });
//     check(copyGoals, Match.Optional(Boolean));

//     if (!this.userId) {
//       throw new Meteor.Error('forbidden-action', 'User should be logged in');
//     }

//     const locale = Meteor.user().profile.language;
//     const bounds = Stages.boundsFor(params.period, params.type, locale);
//     const data = _.extend(params, bounds, { userId: this.userId });

//     if (params.type !== 'years' && !Stages._transform(data).parent()) {
//       throw new Meteor.Error('period-invalid', 'Parent stage needed');
//     }
//     if (Stages._transform(data).siblings().count() > 0) {
//       throw new Meteor.Error('period-invalid', 'Period intersection detected');
//     }

//     const stageId = Stages.insert(data);

//     if (copyGoals && params.type !== 'years') {
//       Stages.findOne(stageId).parent()
//         .goals({ progress: { $ne: 100 } })
//         .map(goal => goal.createChild(stageId));
//     }

//     return stageId;
//   },
// });
