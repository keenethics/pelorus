Meteor.methods({
  'updateUserLanguage': function(chosenLanguage) {
    check(chosenLanguage, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User isn\'t logged in.');
    }

    return Meteor.users.update(this.userId, {
      '$set': {
        'profile.language': chosenLanguage
      }
    }, function(error, result) {
      if (error) {
        throw new Meteor.Error('Localized Language Update Failed.');
      } else {
        Milestones.find({
          userId: this.userId
        }).forEach(function(milestone) {
          let bounds = Milestones.boundsFor(milestone.period,
            milestone.type, chosenLanguage);
          Milestones.update(milestone._id, {
            $set: bounds
          });
        });
      }
    });
  }
});
