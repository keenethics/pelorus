Milestones = new Mongo.Collection('milestones');

Milestones.validTypes = ['years', 'year', 'month', 'week'];

Milestones.attachSchema(new SimpleSchema({
  period: {
    type: String
  },
  type: {
    type: String,
    allowedValues: Milestones.validTypes
  },
  userId: {
    type: String
  },
  startsAt: {
    type: Date,
    optional: true,
    label: 'Start Period',
    custom: function() {
      if (this.value > this.field('endsAt').value) {
        return 'period-invalid';
      }
    }
  },
  endsAt: {
    type: Date,
    optional: true,
    label: 'End Period'
  }
}));

SimpleSchema.messages({
  'period-invalid': 'Last year should be greater than first'
});

Milestones.boundsFor = (period, type, locale = 'en') => {
  const parse = Milestones.periodFormats()[type].parse;
  const start = moment(type === 'years' ? period.split('-')[0] : period, parse);
  const end   = moment(type === 'years' ? period.split('-')[1] : period, parse);
  return {
    startsAt: Milestones.weekBound(start.locale(locale).startOf(type), 'start'),
    endsAt: Milestones.weekBound(end.locale(locale).endOf(type), 'end')
  };
};

Milestones.weekBound = (momentObj, type = 'start') => {
  if (type === 'start' && momentObj.weekday() > 4)  momentObj.add(1, 'w');
  if (type === 'end'   && momentObj.weekday() <= 4) momentObj.subtract(1, 'w');
  return momentObj[`${type}Of`]('week').toDate();
};

Milestones.relativeType = (type, levelDiff) => {
  return Milestones.validTypes[Milestones.validTypes.indexOf(type) + levelDiff];
};

Milestones.periodFormats = extended => ({
  years: { parse: 'YYYY', display: 'YYYY' },
  year: { parse: 'YYYY', display: 'YYYY' },
  month: { parse: 'YYYY-MM', display: extended ? 'MMMM YYYY' : 'MMM' },
  week: { parse: 'YYYY-[W]WW', display: extended ? 'DD MMMM YYYY' : 'DD MMM' }
});

Milestones.helpers({
  goals: function(query) {
    return Goals.find({...query, milestoneId: this._id}, {sort: {rank: 1}});
  },
  parent: function() {
    return Milestones.findOne({
      type: Milestones.relativeType(this.type, -1),
      userId: this.userId,
      startsAt: { $lte: this.startsAt },
      endsAt: { $gte: this.endsAt }
    });
  },
  children: function() {
    return Milestones.find({
      type: Milestones.relativeType(this.type, +1),
      userId: this.userId,
      startsAt: { $gte: this.startsAt },
      endsAt: { $lte: this.endsAt }
    }, {sort: {startsAt: -1}});
  },
  siblings: function() {
    return Milestones.find({
      _id: { $ne: this._id },
      userId: this.userId,
      type: this.type,
      $or: [
        { startsAt: { $gte: this.startsAt, $lte: this.endsAt } },
        { endsAt: { $gte: this.startsAt, $lte: this.endsAt } }
      ]
    });
  },
  title: function(extended) {
    let format = Milestones.periodFormats(extended)[this.type];
    if (this.type === 'years') return this.period;
    if (this.type === 'week') {
      let periods = [
        moment(this.startsAt).format('DD'),
        moment(this.endsAt).format(format.display)
      ];
      return periods.join('-');
    }

    return moment(this.period, format.parse).format(format.display);
  },
  newGoalRank: function() {
    let lastGoal = Goals.findOne({milestoneId: this._id}, {sort: {rank: -1}});
    let lastRank = lastGoal && lastGoal.rank || 0;
    return lastRank + 1;
  },
  progress: function() {
    let sum = this.goals()
      .map(goal => goal.completedPct)
      .filter(Number)
      .reduce((a, b) => a + b, 0);
    return Math.round(sum / this.goals().count());
  },
  isCurrent: function() {
    return moment(this.startsAt).isSameOrBefore() &&
      moment(this.endsAt).isSameOrAfter();
  }
});

Milestones.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});
