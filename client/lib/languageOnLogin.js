Accounts.onLogin(function() {
  let language = Session.get('language');
  if (!language) return Session.set('language', Meteor.user().profile.language);
  Meteor.call('updateUserLanguage', language);
});
