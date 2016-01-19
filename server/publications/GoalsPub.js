Meteor.publish('Goals', function() {
  return Goals.find({userId: this.userId || null});
});

