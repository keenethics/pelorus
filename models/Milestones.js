Milestones = new Mongo.Collection('milestones');

Milestones.validTypes = ['strategic', 'year', 'month', 'week'];

Milestones.attachSchema(new SimpleSchema({
  'period': { 'type': String, 'optional': true },
  'type': { 'type': String, 'allowedValues': Milestones.validTypes },
  'userId': { 'type': String },
  'parentId': { 'type': String, 'optional': true },
  'startsAt': { 'type': Date, 'optional': true, 'label': 'Start Period' },
  'endsAt': { 'type': Date, 'optional': true, 'label': 'End Period' }
}));

Milestones.boundsFor = (date, type) => {
  if (type === 'strategic') {
    return {
      'startsAt': moment(2000, 'YYYY').toDate(),
      'endsAt': moment().add(100, 'y').toDate()
    };
  }
  return {
    'startsAt': Milestones.bound(date.clone().startOf(type), 'start').toDate(),
    'endsAt': Milestones.bound(date.clone().endOf(type), 'end').toDate()
  };
};

// Returns nearest week bound for given date
Milestones.bound = (date, type = 'start') => {
  let _date = date;
  if (type === 'start' && date.day() > 4) {
    _date = date.add(1, 'w');
  }
  if (type === 'end' && date.day() <= 4) {
    _date = date.subtract(1, 'w');
  }
  return _date[`${type}Of`]('isoWeek');
};

Milestones.relativeType = (type, levelDiff) => {
  return Milestones.validTypes[Milestones.validTypes.indexOf(type) + levelDiff];
};

Milestones.periodFormats = extended => ({
  'year': { 'parse': 'YYYY', 'display': 'YYYY' },
  'month': { 'parse': 'YYYY-MM', 'display': extended ? 'MMMM YYYY' : 'MMMM' },
  'week': { 'parse': '', 'display': extended ? 'DD MMMM YYYY' : 'DD MMM' }
});

Milestones.helpers({
  'goals': function() {
    return Goals.find({'milestoneId': this._id}, {'sort': {'priority': 1}});
  },
  'parent': function() { return Milestones.findOne(this.parentId); },
  'children': function() {
    return Milestones.find({'parentId': this._id}, {'sort': {'startsAt': -1}});
  },
  'title': function(extended) {
    let format = Milestones.periodFormats(extended)[this.type];
    if (this.type === 'strategic') return 'Strategic';
    if (this.type === 'week') {
      let periods = [
        moment(this.period).startOf('week').format('DD'),
        moment(this.period).endOf('week').format(format.display)
      ];
      return periods.join('-');
    }

    return moment(this.period, format.parse).format(format.display);
  },
  'isCurrent': function() {
    let now = new Date();

    return ((this.type !== 'strategic') &&
      (moment(this.startsAt).isBefore(now) || (moment(this.startsAt).isSame(now))) &&
      (moment(this.endsAt).isAfter(now) || moment(this.endsAt).isSame(now)));
  }
});

Milestones.allow({
  'insert': function(userId, doc) {
    let milestone = Milestones.findOne({
      'userId': userId,
      'period': doc.period,
      'type': doc.type
    });
    if (!!milestone) {
      throw new Meteor.Error('period-invalid',
        'Milestone for this period already created!');
    }
    return userId === doc.userId && !milestone;
  },
  'update': function(userId, doc) { return userId === doc.userId; },
  'remove': function() { return false; }
});
