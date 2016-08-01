import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';
import { accountsUIBootstrap3 } from 'meteor/ian:accounts-ui-bootstrap-3';

Meteor.startup(() => {
  Tracker.autorun(() => {
    if (!((Meteor.user() || {}).profile || {}).language) return;
    Session.set('language', Meteor.user().profile.language);
  });
  Tracker.autorun(() => {
    let defaultLang = navigator.language.substring(0, 2);
    defaultLang = TAPi18n.getLanguages()[defaultLang] ? defaultLang : 'en';
    const language = Session.get('language') || defaultLang;
    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language);
  });
});
