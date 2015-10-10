Milestones = new Mongo.Collection('Milestones');

Milestones.attachSchema(new SimpleSchema({
  type:              { type: String, label: "Type" },
  startsAt:          { type: Date,   label: "Start Period" },
  endsAt:            { type: Date,   label: "End Period" },
  userId:            { type: String, label: "User ID" },
  parentMilestoneId: { type: String, label: "Parent Milestone ID", optional: true }
}));

Milestones.getPeriod = function(startsAt, type = 'year') {
  return {
    startsAt: Milestones.roundedBound(startsAt, 'start'),
    endsAt:   Milestones.roundedBound(startsAt.endOf(type), 'end')
  }
}

Milestones.roundedBound = (date, type = 'start') => {
  if(type == 'start' && date.day() > 4)  date = date.add(1, 'w');
  if(type == 'end'   && date.day() <= 4) date = date.subtract(1, 'w');
  return date[`${type}Of`]('week');
}

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Milestones.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}

