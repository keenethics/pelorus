Meteor.methods({
  updateUserLanguage: function(chosenLanguage) {
    check(chosenLanguage, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User isn\'t logged in.');
    }

    Meteor.users.update(this.userId, {
      $set: { 'profile.language': chosenLanguage }});

    Milestones.find({ userId: this.userId }).forEach(function(milestone) {
      let bounds = Milestones.boundsFor(milestone.period,
        milestone.type, chosenLanguage);
      Milestones.update(milestone._id, { $set: bounds });
    });
  },

  updateUserFirstDayOfWeek: function(chosenDay) {
    check(chosenDay, Number);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User isn\'t logged in.');
    }

    Meteor.users.update(this.userId, {$set: {'profile.weekDow': chosenDay}});

    moment.locale(Meteor.user().profile.language, {
      week: {dow: Meteor.user().profile.weekDow}
    });
  }
});
