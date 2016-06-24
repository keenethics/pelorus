import './_stage.html';
import '../goals/_goal.js';
Template._stage.events({
  'click .js-add-goal': function(e) {
    e.preventDefault();
    if (!Meteor.user()) return Template.modal.showLoginAlert();

    let data = { stage: this.stage, goal: {} };
    Template.modal.show({title: 'Add goal', template: '_goalsForm', data});
  },
  'click .bar': function() {
    const options = { query: { activeType: this.stage.type } };
    Router.go('home', {}, options);
  }
});
