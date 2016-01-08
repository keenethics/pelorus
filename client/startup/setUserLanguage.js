getUserLanguage = function() {
  if (!Meteor.user()) return 'en';
  return Meteor.user().profile.language;
};

if (Meteor.isClient) {
  Meteor.startup(function() {
    Session.set('showLoadingIndicator', true);
    TAPi18n.setLanguage(getUserLanguage())
      .done(function() {
        Session.set('showLoadingIndicator', false);
      })
      .fail(function( errorMessage ) {
        throw new Meteor.Error(errorMessage, 'Language wasn\'t changed!');
      });
  });
}
