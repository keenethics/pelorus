Meteor.publish('Goals', function() {
  if (!this.userId) return Goals.find({userId: null});
  return Goals.find({userId: this.userId});
});

