Meteor.startup(function() {
  Tracker.autorun(function() {
    TAPi18n.setLanguage(Session.get('language') || 'en');
  });
});
