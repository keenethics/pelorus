Meteor.startup(function() {
  Tracker.autorun(function() {
    if ( !((Meteor.user() || {}).profile || {}).language ) return;
    Session.set('language', Meteor.user().profile.language);
  });

  Tracker.autorun(function() {
    TAPi18n.setLanguage(Session.get('language') || 'en');
    moment.locale(Session.get('language') || 'en');
  });
});
