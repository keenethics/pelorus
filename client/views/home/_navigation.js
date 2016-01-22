Template.navigation.events({
  'click .js-add-milestone': function() {
    let data = { };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Milestone',
      'template': '_milestonesForm', data }, document.body);
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
          element: '.js-add-milestone',
          intro: Meteor.settings.public.intro.steps.step1,
          step: 1,
          position: 'bottom'
        }, {
          element: '.js-add-goal',
          intro: Meteor.settings.public.intro.steps.step2,
          step: 2,
          position: 'left'
        }, {
          element: '.milestone.active .submilestones .milestone .milestone',
          intro: Meteor.settings.public.intro.steps.step3,
          step: 3,
          position: 'left'
        }, {
          element: '#goal-control-buttons',
          intro: Meteor.settings.public.intro.steps.step4,
          step: 4,
          position: 'left'
        }
      ]
    });
    Router.go('home', {}, { query: { activeType: 'years' } });
    tutorial.start();
  }
});