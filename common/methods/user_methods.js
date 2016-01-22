Meteor.methods({
  updateUserLanguage: function(locale) {
    check(locale, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    Meteor.users.update(this.userId, { $set: { 'profile.language': locale } });

    Stages.find({ userId: this.userId }).forEach(function(stage) {
      let bounds = Stages.boundsFor(stage.period, stage.type, locale);
      Stages.update(stage._id, { $set: bounds });
    });
  },

  updateUserFirstDayOfWeek: function(chosenDay) {
    check(chosenDay, Number);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in.');
    }

    Meteor.users.update(this.userId, {$set: {'profile.weekDow': chosenDay}});
  }
});
