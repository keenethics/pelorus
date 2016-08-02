import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TAPi18n } from 'meteor/tap:i18n';

Accounts.onLogin(() => {
  const language = Meteor.users.find(
    {
      _id: Meteor.userId(),
      'profile.language': { $exists: true },
    }
  ).count();
  if (language) return;
  
  let defaultLang = navigator.language.substring(0, 2);
  defaultLang = TAPi18n.getLanguages()[defaultLang] ? defaultLang : 'en';
  Meteor.call('updateUserLanguage', 'en');
});
