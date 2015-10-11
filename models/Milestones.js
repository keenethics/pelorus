Milestones = new Mongo.Collection('Milestones');

Milestones.validTypes = ['week', 'month', 'year', 'strategic'];

Milestones.attachSchema(new SimpleSchema({
  title:    { type: String },
  type:     { type: String, allowedValues: Milestones.validTypes },
  userId:   { type: String },
  parentId: { type: String, optional: true },
  startsAt: { type: Date,   optional: true, label: "Start Period" },
  endsAt:   { type: Date,   optional: true, label: "End Period" }
}));

Milestones.boundsFor = (dateInInterval, type) => ({
  startsAt: Milestones.roundedBound(dateInInterval.clone().startOf(type), 'start').toDate(),
  endsAt:   Milestones.roundedBound(dateInInterval.clone().endOf(type), 'end').toDate()
})

Milestones.roundedBound = (date, type = 'start') => {
  if(type == 'start' && date.day() > 4)  date = date.add(1, 'w');
  if(type == 'end'   && date.day() <= 4) date = date.subtract(1, 'w');
  return date[`${type}Of`]('isoWeek');
}

Milestones.helpers({
  goals:    function() { return Goals.find({milestoneId: this._id}); },
  children: function() { return Milestones.find({parentId: this._id}); }
});

if (Meteor.isServer) {
  Milestones.allow({
    insert: function (userId, doc) { return userId == doc.userId; },
    update: function (userId, doc) { return userId == doc.userId; },
    remove: function () { return false; }
  });
}

