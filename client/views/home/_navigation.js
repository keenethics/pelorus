Template.navigation.events({
  'click .js-add-milestone': function() {
    let data = { };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Milestone',
      'template': '_milestonesForm', data }, document.body);
  },
  'click .js-set-language': function(e) {
    let prevLanguage = Meteor.user().profile.language;
    let chosenLanguage = $(e.target).data('lang');
    Session.set('language', chosenLanguage);
    if (Meteor.userId()) {
      Meteor.call('updateUserLanguage', chosenLanguage);
      Meteor.call('recalculateBounds', prevLanguage, chosenLanguage);
    }
  }
});
