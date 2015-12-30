Milestones = new Mongo.Collection('milestones');

Milestones.validTypes = ['week', 'month', 'year', 'strategic'];

Milestones.attachSchema(new SimpleSchema({
  period:   { type: String, optional: true, unique: true },
  type:     { type: String, allowedValues: Milestones.validTypes },
  userId:   { type: String },
  parentId: { type: String, optional: true },
  startsAt: { type: Date,   optional: true, label: "Start Period" },
  endsAt:   { type: Date,   optional: true, label: "End Period" }
}));

Milestones.boundsFor = (date, type) => {
  if(type == 'strategic') return { startsAt: moment(2000, 'YYYY').toDate(), endsAt: moment().add(100, 'y').toDate() }
  return {
    startsAt: Milestones.bounds(date.clone().startOf(type), 'start').toDate(),
    endsAt:   Milestones.bounds(date.clone().endOf(type), 'end').toDate()
  }
}

Milestones.bounds = (date, type = 'start') => {
  if(type == 'start' && date.day() > 4)  date = date.add(1, 'w');
  if(type == 'end'   && date.day() <= 4) date = date.subtract(1, 'w');
  return date[`${type}Of`]('isoWeek');
}

Milestones.parentType = type => Milestones.validTypes[ Milestones.validTypes.indexOf(type) + 1 ];

Milestones.helpers({
  goals:    function() { return Goals.find({milestoneId: this._id}); },
  parent:   function() { return Milestones.findOne(this.parentId) },
  children: function() { return Milestones.find({parentId: this._id}); },
  title:    function() { return this.type == 'strategic' ? 'Strategic' : this.period; } // TODO: humanize
});

if (Meteor.isServer) {
  Milestones.allow({
    insert: function (userId, doc) { return userId == doc.userId; },
    update: function (userId, doc) { return userId == doc.userId; },
    remove: function () { return false; }
  });
}

