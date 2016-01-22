Meteor.startup(function() {
  Tracker.autorun(function() {
    if ( !((Meteor.user() || {}).profile || {}).language ) {
      return $.getJSON('http://ipinfo.io', function(ipData) {
        Session.set('language', ipData.country.toLowerCase());
      });
    }
    Session.set('language', Meteor.user().profile.language);
  });

  Tracker.autorun(function() {
    let language = Session.get('language') || 'en';
    if (language === 'ua') language = 'uk';
    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language === 'uk' ? 'ua' : language);

    if ( !((Meteor.user() || {}).profile || {}).weekDow ) return;
    moment.locale(Meteor.user().profile.language, {
      week: {dow: Meteor.user().profile.weekDow}
    });
  });
});
