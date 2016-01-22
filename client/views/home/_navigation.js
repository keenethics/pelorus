Template.navigation.events({
  'click .js-add-stage': function() {
    Template.modal.show({title: 'Add stage', template: '_stagesForm'});
  },
  'click .js-set-language': function(e) {
    let language = $(e.target).data('lang');
    Session.set('language', language);
    if (Meteor.userId()) Meteor.call('updateUserLanguage', language);
  },
  'click #js-run-tutorial': function(e) {
    e.preventDefault();
    let tutorial = introJs().setOptions({ showProgress: true });
    Router.go('home', {}, { query: { activeType: 'years' } });
    tutorial.start();
  }
});
