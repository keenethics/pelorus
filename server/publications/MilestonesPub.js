Meteor.publish('Milestones', function () {
  return Milestones.find();
});
