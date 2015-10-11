Meteor.publish('Goals', function () {
  if(!this.userId) return [];
  return Goals.find({userId: this.userId});
});

