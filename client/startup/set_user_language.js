Meteor.startup(function() {
  Tracker.autorun(function() {
    if ( !((Meteor.user() || {}).profile || {}).language ) return;
    Session.set('language', Meteor.user().profile.language);
  });

  Tracker.autorun(function() {
    let defaultLang = navigator.language.substring(0, 2);
    defaultLang = TAPi18n.getLanguages()[defaultLang] ? defaultLang : 'en';

    let language = Session.get('language') || defaultLang;

    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language);
  });
});
