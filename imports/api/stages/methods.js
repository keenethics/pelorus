import { Meteor } from 'meteor/meteor';
import { Stages } from './stages.js';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const addStage = new ValidatedMethod({
  name: 'stages.addStage',

  validate({ stage, copyGoals }) {
    check(stage, { type: String, period: String });
    check(copyGoals, Match.Optional(Boolean));
  },

  run({ stage, copyGoals }) {
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    const locale = Meteor.user().profile.language;
    const bounds = Stages.boundsFor(stage.period, stage.type, locale);
    const data = _.extend(stage, bounds, { userId: this.userId });

    if (stage.type !== 'years' && !Stages._transform(data).parent()) {
      throw new Meteor.Error('period-invalid', 'Parent stage needed');
    }
    if (Stages._transform(data).siblings().count() > 0) {
      throw new Meteor.Error('period-invalid', 'Period intersection detected');
    }

    const stageId = Stages.insert(data);

    if (copyGoals && stage.type !== 'years') {
      Stages.findOne(stageId).parent()
        .goals({ progress: { $ne: 100 } })
        .map(goal => goal.createChild(stageId));
    }
  }
});
