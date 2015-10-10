Goals = new Mongo.Collection('goals');

Goals.attachSchema(
    new SimpleSchema({
    title: {
      type: String,
      label: "Title"
    },
    content: {
      type: String,
      label: "Content"
    },
    createdAt: {
      type: Date,
      denyUpdate: true,
      label: "Сreated At"
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
