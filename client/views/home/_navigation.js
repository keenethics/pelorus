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
    let tutorial = introJs().setOptions({
      showProgress: true,
      steps: [
        {
          element: '.js-add-stage',
          intro: Meteor.settings.public.intro.steps.step1,
          step: 1,
          position: 'bottom'
        }, {
          element: '.js-add-goal',
          intro: Meteor.settings.public.intro.steps.step2,
          step: 2,
          position: 'left'
        }, {
          element: '.stage.active .substages .substages .bar',
          intro: Meteor.settings.public.intro.steps.step3,
          step: 3,
          position: 'left'
        }, {
          element: '.list-group-item.goal',
          intro: Meteor.settings.public.intro.steps.step4,
          step: 4,
          position: 'bottom'
        }
      ]
    });
    Router.go('home', {}, { query: { activeType: 'years' } });
    tutorial.start();
  }
});
