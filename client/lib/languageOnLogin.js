Accounts.onLogin(function() {
  if (Meteor.user().profile.language) return;
  Meteor.call('updateUserLanguage', Session.get('language') || 'en');
});
