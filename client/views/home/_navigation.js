Template.navigation.events({
  'click .js-add-milestone': function() {
    let data = { };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Milestone',
      'template': '_milestonesForm', data }, document.body);
  },
  'click .js-set-language': function( e ) {
    let chosenLanguage = $(e.target).text();
    if (chosenLanguage === 'English') chosenLanguage = 'en';
    if (chosenLanguage === 'Русский') chosenLanguage = 'ru';
    if (chosenLanguage === 'Українська') chosenLanguage = 'ua';
    Session.set('language', chosenLanguage);
    Meteor.call('updateUserLanguage', chosenLanguage);
  }
});

Accounts.onLogin(function() {
  let language = Session.get('language');
  if (!language) return;
  Meteor.call('updateUserLanguage', language);
});

Template.navigation.helpers({
  'canAddMilestones': function() {
    return Meteor.userId() && Session.get('canAddMilestones');
  }
});
