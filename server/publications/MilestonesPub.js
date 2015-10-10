Meteor.publish('Milestones', function () {
  return Milestones.find({userId: this.userId});
});

