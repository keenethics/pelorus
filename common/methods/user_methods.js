Meteor.methods({
  'updateUserLanguage': function(chosenLanguage) {
    check(chosenLanguage, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User isn\'t logged in.');
    }

    Milestones.find({userId: this.userId}, {
      fields: {
        userId: 1,
        period: 1,
        type: 1
      }
    }).forEach(function(milestone) {
      let bounds = Milestones.boundsFor(milestone.period,
        milestone.type, chosenLanguage);
      Milestones.update({
        _id: milestone._id,
        userId: milestone.userId
      }, {
        $set: bounds
      });
    });

    return Meteor.users.update(this.userId, {
      '$set': {'profile.language': chosenLanguage}});
  }
});
