Meteor.publish('Milestones', function() {
  if (!this.userId) return Milestones.find({userId: null});
  return Milestones.find({userId: this.userId});
});

