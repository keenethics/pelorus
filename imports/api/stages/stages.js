
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Stages = new Mongo.Collection('stages');

Stages.validTypes = ['years', 'year', 'month', 'week'];

Stages.attachSchema(new SimpleSchema({
  period: {
    type: String
  },
  type: {
    type: String,
    allowedValues: Stages.validTypes
  },
  userId: {
    type: String,
    optional: true
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

Stages.boundsFor = (period, type, locale = 'en') => {
  const parse = Stages.periodFormats()[type].parse;
  const start = moment(type === 'years' ? period.split('-')[0] : period, parse);
  const end   = moment(type === 'years' ? period.split('-')[1] : period, parse);
  return {
    startsAt: Stages.weekBound(start.locale(locale).startOf(type), 'start'),
    endsAt: Stages.weekBound(end.locale(locale).endOf(type), 'end')
  };
};

Stages.weekBound = (momentObj, type = 'start') => {
  if (type === 'start' && momentObj.weekday() > 4)  momentObj.add(1, 'w');
  if (type === 'end'   && momentObj.weekday() <= 4) momentObj.subtract(1, 'w');
  return momentObj[`${type}Of`]('week').toDate();
};

Stages.relativeType = (type, levelDiff) => {
  return Stages.validTypes[Stages.validTypes.indexOf(type) + levelDiff];
};

Stages.periodFormats = extended => ({
  years: { parse: 'YYYY', display: 'YYYY' },
  year: { parse: 'YYYY', display: 'YYYY' },
  month: { parse: 'YYYY-MM', display: extended ? 'MMMM YYYY' : 'MMM' },
  week: { parse: 'YYYY-[W]WW', display: extended ? 'DD MMMM YYYY' : 'DD MMM' }
});

Stages.helpers({
  goals: function(query) {
    return Goals.find({...query, stageId: this._id}, {sort: {rank: 1}});
  },
  parent: function() {
    return Stages.findOne({
      type: Stages.relativeType(this.type, -1),
      userId: this.userId,
      startsAt: { $lte: this.startsAt },
      endsAt: { $gte: this.endsAt }
    });
  },
  children: function() {
    return Stages.find({
      type: Stages.relativeType(this.type, +1),
      userId: this.userId,
      startsAt: { $gte: this.startsAt },
      endsAt: { $lte: this.endsAt }
    }, {sort: {startsAt: -1}});
  },
  siblings: function() {
    return Stages.find({
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
    let format = Stages.periodFormats(extended)[this.type].display;
    if (this.type === 'years') return this.period;
    if (!this.startsAt || !this.startsAt) return '';

    let [start, end] = [moment(this.startsAt), moment(this.endsAt)];
    if (this.type === 'week') {
      return `${start.format('DD')}-${end.format(format)}`;
    } else {
      return end.subtract(3, 'days').format(format);
    }
  },
  newGoalRank: function() {
    let lastGoal = Goals.findOne({stageId: this._id}, {sort: {rank: -1}});
    let lastRank = lastGoal && lastGoal.rank || 0;
    return lastRank + 1;
  },
  progress: function() {
    let sum = this.goals()
      .map(goal => goal.progress)
      .filter(Number)
      .reduce((a, b) => a + b, 0);
    return Math.round(sum / this.goals().count());
  },
  isCurrent: function() {
    return moment(this.startsAt).isSameOrBefore() &&
      moment(this.endsAt).isSameOrAfter();
  }
});

Stages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});