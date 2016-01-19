Meteor.startup(function() {
  Tracker.autorun(function() {
    if ( !((Meteor.user() || {}).profile || {}).language ) return;
    Session.set('language', Meteor.user().profile.language);
  });

  Tracker.autorun(function() {
    const language = Session.get('language') || 'en';
    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language === 'uk' ? 'ua' : language);
  });
});
