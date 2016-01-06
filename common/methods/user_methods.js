Meteor.methods({
  'updateUserLanguage': function(chosenLanguage) {
    check(chosenLanguage, String);
    if (this.userId) {
      return Meteor.users.update(this.userId, {'$set':
                        {'profile.language': chosenLanguage}});
    }
  }
});
