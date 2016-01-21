Template.navigation.events({
  'click .js-add-milestone': function() {
    Template.modal.show({title: 'Add Milestone', template: '_milestonesForm'});
  },
  'click .js-set-language': function(e) {
    let language = $(e.target).data('lang');
    Session.set('language', language);
    if (Meteor.userId()) Meteor.call('updateUserLanguage', language);
  }
});
