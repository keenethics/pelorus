Milestones = new Mongo.Collection('milestones');

Milestones.validTypes = ['week', 'month', 'year', 'strategic'];

Milestones.attachSchema(new SimpleSchema({
  'period': { 'type': String, 'optional': true, 'unique': true },
  'type': { 'type': String, 'allowedValues': Milestones.validTypes },
  'userId': { 'type': String },
  'parentId': { 'type': String, 'optional': true },
  'startsAt': { 'type': Date,   'optional': true, 'label': 'Start Period' },
  'endsAt': { 'type': Date,   'optional': true, 'label': 'End Period' },
}));

Milestones.boundsFor = (date, type) => {
  if (type === 'strategic') {
    return {
      'startsAt': moment(2000, 'YYYY').toDate(),
      'endsAt': moment().add(100, 'y').toDate(),
    };
  }
  return {
    'startsAt': Milestones.bounds(date.clone().startOf(type), 'start').toDate(),
    'endsAt': Milestones.bounds(date.clone().endOf(type), 'end').toDate(),
  };
};

Milestones.bounds = (date, type = 'start') => {
  let _date = date;
  if (type === 'start' && date.day() > 4) {
    _date = date.add(1, 'w');
  }
  if (type === 'end' && date.day() <= 4) {
    _date = date.subtract(1, 'w');
  }
  return _date[`${type}Of`]('isoWeek');
};

Milestones.parentType = (type) => {
  return Milestones.validTypes[ Milestones.validTypes.indexOf(type) + 1 ];
};

Milestones.periodFormats = {
  'year': { 'parse': 'YYYY', 'display': 'YYYY' },
  'month': { 'parse': 'YYYY-MM', 'display': 'MMMM' },
  'week': { 'parse': '', 'display': '[Week&nbsp;]#ww' },
};

Milestones.periodFormatsExtended = {
  'year': { 'parse': 'YYYY', 'display': 'YYYY' },
  'month': { 'parse': 'YYYY-MM', 'display': 'MMMM YYYY' },
  'week': { 'parse': '', 'display': '[Week&nbsp;]#ww' },
};

Milestones.helpers({
  'goals': function() { return Goals.find({'milestoneId': this._id}); },
  'parent': function() { return Milestones.findOne(this.parentId); },
  'children': function() { return Milestones.find({'parentId': this._id}); },
  'title': function(extendeed) {
    let periodFormats;
    if (extendeed) {
      periodFormats = Milestones.periodFormatsExtended;
    } else {
      periodFormats = Milestones.periodFormats;
    }
    if (this.type === 'strategic') return 'Strategic';
    let format = periodFormats[this.type];
    return moment(this.period, format.parse).format(format.display);
  },
  'progress': function() {
    let sum = 0;
    let count = 0;
    let goals = Goals.find({
      'milestoneId': this._id
      }, {
        fields: {
          'completedPct': 1,
          'isMeasurable': 1,
        }
      }).fetch();

    _.forEach(goals, function(goal) {
      if(goal.isMeasurable) {
        sum += goal.completedPct;
        count ++;
      }
    });

    return Math.round(sum/count) || 0;
  }
});

if (Meteor.isServer) {
  Milestones.allow({
    'insert': function(userId, doc) { return userId === doc.userId; },
    'update': function(userId, doc) { return userId === doc.userId; },
    'remove': function() { return false; },
  });
}

