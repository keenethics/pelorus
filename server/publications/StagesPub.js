Meteor.publish('Stages', function() {
  return Stages.find({userId: this.userId || null});
});

