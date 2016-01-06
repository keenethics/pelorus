Meteor.methods({
  'updateUserLanguage': function(chosenLanguage) {
    check(chosenLanguage, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User isn\'t logged in.');
    }
    return Meteor.users.update(this.userId, {'$set':
                        {'profile.language': chosenLanguage}});
  }
});
