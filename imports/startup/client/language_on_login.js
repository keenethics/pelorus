import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';

// Accounts.onLogin(() => {
//   console.log('lang_onligin')
//   const language = Meteor.users.find(
//     {
//       _id: Meteor.userId(),
//       'profile.language': { $exists: true },
//     }
//   ).count();
//   console.log(language)
//   if (language) return;
//   Meteor.call('updateUserLanguage', Session.get('language') || 'en');
//   // Meteor.call('updateUserLanguage', 'en');
// });
