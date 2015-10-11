Meteor.publish('Milestones', function () {
  if(!this.userId) return [];
  return Milestones.find({userId: this.userId});
});

