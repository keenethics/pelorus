Milestones = new Mongo.Collection('milestones');

Milestones.validTypes = ['strategic', 'year', 'month', 'week'];

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

Milestones.boundsFor = (period, type) => {
  if (type === 'strategic') {
    [firstYear, lastYear] = period.split('-');

    return {
      startsAt: moment(firstYear, 'YYYY').toDate(),
      endsAt: moment(lastYear, 'YYYY').endOf('year').toDate()
    };
  }

  const date = moment(period);
  const isoType = type === 'week' ? 'isoWeek' : type;

  return {
    startsAt: Milestones.bound(date.clone().startOf(isoType), 'start').toDate(),
    endsAt: Milestones.bound(date.clone().endOf(isoType), 'end').toDate()
  };
};

// Returns nearest week bound for given date
Milestones.bound = (date, type = 'start') => {
  if (type === 'start' && date.day() > 4)  date.add(1, 'w');
  if (type === 'end'   && date.day() <= 4) date.subtract(1, 'w');
  return date[`${type}Of`]('isoWeek');
};

Milestones.relativeType = (type, levelDiff) => {
  return Milestones.validTypes[Milestones.validTypes.indexOf(type) + levelDiff];
};

Milestones.periodFormats = extended => ({
  year: { parse: 'YYYY', display: 'YYYY' },
  month: { parse: 'YYYY-MM', display: extended ? 'MMMM YYYY' : 'MMM' },
  week: { parse: '', display: extended ? 'DD MMMM YYYY' : 'DD MMM' }
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
  title: function(extended) {
    let format = Milestones.periodFormats(extended)[this.type];
    if (this.type === 'strategic') return this.period;
    if (this.type === 'week') {
      let periods = [
        moment(this.period).startOf('week').format('DD'),
        moment(this.period).endOf('week').format(format.display)
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
  insert: function(userId, doc) {
    let milestone = Milestones.findOne({
      userId: userId,
      period: doc.period,
      type: doc.type
    });
    if (milestone) {
      throw new Meteor.Error('period-invalid',
        'Milestone for this period already created!');
    }
    return userId === doc.userId && !milestone;
  },
  update: function(userId, doc) { return userId === doc.userId; },
  remove: function() { return false; }
});
