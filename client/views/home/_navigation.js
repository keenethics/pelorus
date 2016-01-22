Template.navigation.events({
  'click .js-add-stage': function() {
    Template.modal.show({title: 'Add stage', template: '_stagesForm'});
  },
  'click .js-set-language': function(e) {
    let language = $(e.target).data('lang');
    Session.set('language', language);
    if (Meteor.userId()) Meteor.call('updateUserLanguage', language);
  }
});
