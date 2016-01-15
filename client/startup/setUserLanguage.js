Meteor.startup(function() {
  Tracker.autorun(function() {
    let lan = Session.get('language') || 'en';
    TAPi18n.setLanguage(lan);
    moment.locale(lan);
  });
});
