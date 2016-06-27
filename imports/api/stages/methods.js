import { Meteor } from 'meteor/meteor';
import { Stages } from  './stages.js';

Meteor.methods({
  addStage: function(params, copyGoals) {
    check(params, {type: String, period: String});
    check(copyGoals, Match.Optional(Boolean));

    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    const locale = Meteor.user().profile.language;
    const bounds = Stages.boundsFor(params.period, params.type, locale);
    const data = _.extend(params, bounds, {userId: this.userId});

    if (params.type !== 'years' && !Stages._transform(data).parent()) {
      throw new Meteor.Error('period-invalid', 'Parent stage needed');
    }
    if (Stages._transform(data).siblings().count() > 0) {
      throw new Meteor.Error('period-invalid', 'Period intersection detected');
    }

    const stageId = Stages.insert(data);

    if (copyGoals && params.type !== 'years') {
      Stages.findOne(stageId).parent()
        .goals({progress: { $ne: 100 }})
        .map(goal => goal.createChild(stageId));
    }

    return stageId;
  }
});
