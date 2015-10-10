Meteor.publish('Goals', function () {
  return Goals.find();
});
