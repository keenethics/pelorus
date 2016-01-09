Template.navigation.events({
  'click .js-add-milestone': function() {
    let data = { };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Milestone',
      'template': '_milestonesForm', data }, document.body);
  },
  'click .js-set-language': function( e ) {
    let chosenLanguage = $(e.target).data('lang');
    TAPi18n.setLanguage(chosenLanguage);
    Session.set('language', chosenLanguage);
    Meteor.call('updateUserLanguage', chosenLanguage);
  }
});

Template.navigation.helpers({
  'canAddMilestones': function() {
    return Meteor.userId() && Session.get('canAddMilestones');
  }
});
