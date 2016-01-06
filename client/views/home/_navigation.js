Template.navigation.events({
  'click .js-add-milestone': function() {
    let data = { };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Milestone',
      'template': '_milestonesForm', data }, document.body);
  },
  'click .user-language': function( e ) {
    let chosenLanguage = $(e.target).text();
    Session.set('language', chosenLanguage);
    Meteor.call('updateUserLanguage', chosenLanguage);
  }
});

Accounts.onLogin(function() {
  let language = Session.get('language');
  if (language) {
    Meteor.users.update(Meteor.userId(), {'$set':
                        {'profile.language': language}});
  }
});

Template.navigation.helpers({
  'canAddMilestones': function() {
    return Meteor.userId() && Session.get('canAddMilestones');
  }
});
