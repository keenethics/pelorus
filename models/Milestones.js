Milestones = new Mongo.Collection('Milestones');

Milestones.attachSchema(new SimpleSchema({
  type:              { type: String, label: "Type" },
  startsAt:          { type: Date,   label: "Start Period" },
  endsAt:            { type: Date,   label: "End Period" },
  userId:            { type: String, label: "User ID" },
  parentMilestoneId: { type: String, label: "Parent Milestone ID", optional: true }
}));

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
