Goals = new Mongo.Collection('goals');

Goals.attachSchema(new SimpleSchema({
  title:           { type: String, label: "Title" },
  parentId:        { type: String, label: "Parent Goal ID", optional: true },
  milestoneId:     { type: String, label: "Milestone ID" },
  userId:          { type: String, label: "User ID" },
  completedPct:    { type: Number, label: "Percent Completed", optional: true },
  pctOfParentGoal: { type: Number, label: "Percent of Parent Goal", optional: true }
}));

if (Meteor.isServer) {
  Goals.allow({
    insert: function (userId, doc) { return userId == doc.userId; },
    update: function (userId, doc) { return userId == doc.userId; },
    remove: function () { return false; }
  });
}

