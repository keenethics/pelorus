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

  Meteor.call('updateUserLanguage', TAPi18n.getLanguage());
});
