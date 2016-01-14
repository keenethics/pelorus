Meteor.startup(function() {
  Tracker.autorun(function() {
    TAPi18n.setLanguage(Meteor.user().profile.language ||
        Session.get('language') || 'en');
  });
});
