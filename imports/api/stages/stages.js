import { Mongo } from 'meteor/mongo';
import { Goals } from '/imports/api/goals/goals.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { moment } from 'meteor/momentjs:moment';

export const Stages = new Mongo.Collection('stages');

Stages.validTypes = ['years', 'year', 'month', 'week'];

Stages.attachSchema(new SimpleSchema({
  period: {
    type: String,
  },
  type: {
    type: String,
    allowedValues: Stages.validTypes,
  },
  userId: {
    type: String,
    optional: true,
  },
  startsAt: {
    type: Date,
    optional: true,
    label: 'Start Period',
    custom() {
      if (this.value > this.field('endsAt').value) {
        return 'period-invalid';
      }
    },
  },
  endsAt: {
    type: Date,
    optional: true,
    label: 'End Period',
  },
}));

SimpleSchema.messages({
  'period-invalid': 'Last year should be greater than first',
});

Stages.boundsFor = (period, type, locale = 'en') => {
  const parse = Stages.periodFormats()[type].parse;
  const start = moment.utc(type === 'years' ? period.split('-')[0] : period, parse);
  const end = moment.utc(type === 'years' ? period.split('-')[1] : period, parse);
  return {
    startsAt: Stages.weekBound(start.locale(locale).startOf(type), 'start'),
    endsAt: Stages.weekBound(end.locale(locale).endOf(type), 'end'),
  };
};

Stages.weekBound = (momentObj, type = 'start') => {
  if (type === 'start' && momentObj.weekday() > 4) momentObj.add(1, 'w');
  if (type === 'end' && momentObj.weekday() <= 4) momentObj.subtract(1, 'w');
  return momentObj[`${type}Of`]('week').toDate();
};

Stages.relativeType = (type, levelDiff) => Stages.validTypes[Stages.validTypes.indexOf(type)
  + levelDiff];

Stages.periodFormats = extended => ({
  years: { parse: 'YYYY', display: 'YYYY' },
  year: { parse: 'YYYY', display: 'YYYY' },
  month: { parse: 'YYYY-MM', display: extended ? 'MMMM YYYY' : 'MMM' },
  week: { parse: 'YYYY-[W]WW', display: extended ? 'DD MMMM YYYY' : 'DD MMM' },
});


Stages.helpers({
  children() {
    return Stages.find(
      {
        type: Stages.relativeType(this.type, 1),
        userId: this.userId,
        $and: [
          { startsAt: { $gte: this.startsAt } },
          { endsAt: { $lte: this.endsAt } },
        ],
      },
     { sort: { startsAt: -1 } }).fetch();
  },

  isCurrent() {
    return moment(this.startsAt).isSameOrBefore() &&
      moment(this.endsAt).isSameOrAfter();
  },
  goals(query) {
    return Goals.find(Object.assign({ stageId: this._id }, query), { sort: { rank: 1 } }).fetch();
  },

  parent() {
    return Stages.findOne({
      type: Stages.relativeType(this.type, -1),
      userId: this.userId,
      startsAt: { $lte: this.startsAt },
      endsAt: { $gte: this.endsAt },
    });
  },

  title(extended) {
    const format = Stages.periodFormats(extended)[this.type].display;
    if (this.type === 'years') return this.period;
    if (!this.startsAt || !this.startsAt) return '';

    const [start, end] = [moment(this.startsAt), moment(this.endsAt)];
    if (this.type === 'week') {
      return `${start.format('DD')}-${end.format(format)}`;
    }
    return end.subtract(3, 'days').format(format);
  },

  progress() {
    const sum = this.goals()
      .map(goal => goal.progress)
      .filter(Number)
      .reduce((a, b) => a + b, 0);

    return Math.round(sum / this.goals().length);
  },

  siblings() {
    return Stages.find({
      _id: { $ne: this._id },
      userId: this.userId,
      type: this.type,
      $or: [
        { startsAt: { $gte: this.startsAt, $lte: this.endsAt } },
        { endsAt: { $gte: this.startsAt, $lte: this.endsAt } },
      ],
    });
  },

  newGoalRank() {
    const lastGoal = Goals.findOne({ stageId: this._id }, { sort: { rank: -1 } });
    const lastRank = lastGoal && lastGoal.rank || 0;
    return lastRank + 1;
  },
});

Stages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
