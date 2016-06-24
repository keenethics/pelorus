import './_navigation.html';
import './modal.js';
import '../stages/_form.js';
import '../users/_login_alert.html';

Template.navigation.events({
  'click .js-add-stage': function() {
    if (!Meteor.user()) return Template.modal.showLoginAlert();
    Template.modal.show({title: 'Add stage', template: '_stagesForm'});
  },
  'click .js-set-language': function(e) {
    let language = $(e.target).data('lang');
    Session.set('language', language);
    if (Meteor.userId()) Meteor.call('updateUserLanguage', language);
  },
  'click #js-run-tutorial': function(e, t) {
    e.preventDefault();
    let steps = [
      { intro: TAPi18n.__("Pelorus is") },
      {
        intro: TAPi18n.__("Stage is a goals period"),
        element: t.find('.js-add-stage')
      },
      {
        intro: TAPi18n.__("Create goals"),
        element: $('.active > .stage-content .js-add-goal').get(0)
      },
      {
        intro: TAPi18n.__("Switch views"),
        element: $('.stage:not(.active) > .bar').get(0)
      },
      {
        intro: TAPi18n.__("Edit goal"),
        element: $('.active > .stage-content .goal').get(0)
      },
    ];
    introJs().setOptions({showStepNumbers: false, steps}).start();
  }
});
