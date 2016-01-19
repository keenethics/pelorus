Meteor.methods({
  addMilestone: function(params, copyGoals) {
    check(params, {type: String, period: String});
    check(copyGoals, Match.Optional(Boolean));

    if (!this.userId)
      throw new Meteor.Error('forbidden-action', 'User should be logged in.');

    const locale = Meteor.user().profile.language;
    const bounds = Milestones.boundsFor(params.period, params.type, locale);
    const data = _.extend(params, bounds, {userId: this.userId});

    if (params.type !== 'years' && !Milestones._transform(data).parent())
      throw new Meteor.Error('period-invalid', 'Parent milestone needed');
    if (Milestones._transform(data).siblings().count() > 0)
      throw new Meteor.Error('period-invalid', 'Period intersection detected');

    const milestoneId = Milestones.insert(data);

    if (copyGoals && params.type !== 'years') {
      Milestones.findOne(milestoneId).parent()
        .goals({completed: { $ne: true }})
        .map(goal => goal.createChild(milestoneId));
    }

    return milestoneId;
  },
  recalculateBounds: function(prevLocale, newLocale) {
    let milestones = Milestones.find({userId: this.userId}, {
      fields: {
        userId: 1,
        period: 1,
        type: 1
      }
    });

    if (!milestones.count() ||
      ((prevLocale == 'ru' && newLocale == 'uk') ||
        (prevLocale == 'uk' && newLocale == 'ru')))
      return;

    milestones.forEach(function(milestone) {
      let bounds = Milestones.boundsFor(milestone.period, milestone.type, newLocale);
      Milestones.update({
        _id: milestone._id,
        userId: milestone.userId
      }, {
        $set: bounds
      });
    });
  }
});
