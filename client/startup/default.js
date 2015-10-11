Meteor.startup(function () {
  Meteor.subscribe('Milestones');
  Meteor.subscribe('Goals');
});

