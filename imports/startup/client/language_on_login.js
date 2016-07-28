import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(function () {
  if (Meteor.users.find({
    _id: Meteor.userId(), 'profile.language': { $exists: true, },
    }).count()) return;
  Meteor.call('updateUserLanguage', Session.get('language') || 'en');
});
