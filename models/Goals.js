Goals = new Mongo.Collection('goals');

Goals.attachSchema(
    new SimpleSchema({
    title: {
      type: String,
      label: "Title"
    },
    parentGoalId: {
      type: String,
      label: "Parent Goal ID"
    },
    milestoneId: {
      type: String,
      label: "Milestone ID"
    },
    userId: {
      type: String,
      label: "User ID"
    },
    procentCompleted: {
      type: Number,
      label: "Procent Completed"
    },
    parentGoalProcent: {
      type: Number,
      label: "Parent Goal Procent"
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Goals.allow({
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
