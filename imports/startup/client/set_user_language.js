import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';

Meteor.startup(function () {
  Tracker.autorun(function () {
    if (!((Meteor.user() || {}).profile || {}).language) return;
    Session.set('language', Meteor.user().profile.language);
  });
  Tracker.autorun(function () {
    let defaultLang = navigator.language.substring(0, 2);
    defaultLang = TAPi18n.getLanguages()[defaultLang] ? defaultLang : 'en';

    const language = Session.get('language') || defaultLang;

    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language);
  });
});
