Milestones = new Mongo.Collection('Milestones');

Milestones.attachSchema(
    new SimpleSchema({
    type: {
      type: String,
      label: "Type"
    },
    startPeriod: {
      type: Date,
      label: "Start Period"
    },
    endPeriod: {
      type: Date,
      label: "End Period"
    },
    createdAt: {
      type: Date,
      denyUpdate: true,
      label: "Created At"
    }
  })
);

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
