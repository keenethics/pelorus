Meteor.startup(function() {
  Tracker.autorun(function() {
    if ( !((Meteor.user() || {}).profile || {}).language ) {
      return Session.set('language', navigator.language.substring(0, 2));
    }
    Session.set('language', Meteor.user().profile.language);
  });

  Tracker.autorun(function() {
    let language = Session.get('language') || 'en';

    if (!['en', 'ru', 'ua'].indexOf(language)) language = 'en';

    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language === 'uk' ? 'ua' : language);

    if ( !((Meteor.user() || {}).profile || {}).weekDow ) return;
    moment.locale(Meteor.user().profile.language, {
      week: {dow: Meteor.user().profile.weekDow}
    });
  });
});
