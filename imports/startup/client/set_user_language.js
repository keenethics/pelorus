import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';
import { accountsUIBootstrap3 } from 'meteor/ian:accounts-ui-bootstrap-3';

Meteor.startup(() => {
//   console.log('set_user_lang')
//   Tracker.autorun(() => {
//     console.log(Meteor.user())
//     if (!((Meteor.user() || {}).profile || {}).language) return;
//     console.log(Meteor.user().profile.language)
    Session.set('language', Meteor.user().profile.language);
//   });
  Tracker.autorun(() => {

    console.log(navigator.language)
    let defaultLang = navigator.language.substring(0, 2);
    console.log(defaultLang)
    defaultLang = TAPi18n.getLanguages()[defaultLang] ? defaultLang : 'en';
    console.log(defaultLang)
    if ( Meteor.user() ) {
      console.log( Meteor.userId() )
      console.log( Meteor.user() )

    }
//     console.log(defaultLang)
    const language = Meteor.user() ? Meteor.user().profile.language :  defaultLang;
//     // const language =  defaultLang;
  console.log(language)
    TAPi18n.setLanguage(language);
    moment.locale(language);
    accountsUIBootstrap3.setLanguage(language);
  });
});
