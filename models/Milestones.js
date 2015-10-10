Milestones = new Mongo.Collection('Milestones');

Milestones.attachSchema(new SimpleSchema({
  type:              { type: String, label: "Type", allowedValues: ['strategic', 'year', 'month', 'week'] },
  startsAt:          { type: Date,   label: "Start Period" },
  endsAt:            { type: Date,   label: "End Period" },
  userId:            { type: String, label: "User ID" },
  parentMilestoneId: { type: String, label: "Parent Milestone ID", optional: true }
}));

Milestones.roundedBound = (date, type = 'start') => {
  if(type == 'start' && date.day() > 4)  date = date.add(1, 'w');
  if(type == 'end'   && date.day() <= 4) date = date.subtract(1, 'w');
  return date[`${type}Of`]('week');
}

if (Meteor.isServer) {
  Milestones.allow({
    insert: function (userId, doc) { return userId == doc.userId; },
    update: function (userId, doc) { return userId == doc.userId; },
    remove: function () { return false; }
  });
}

