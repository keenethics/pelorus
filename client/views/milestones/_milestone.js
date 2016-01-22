Template._milestone.events({
  'click .js-add-goal': function(e) {
    e.preventDefault();
    if (!Meteor.user()) return Template.modal.showLoginAlert();

    let data = { milestone: this.milestone, goal: {} };
    Template.modal.show({title: 'Add goal', template: '_goalsForm', data});
  },
  'click .bar': function() {
    const options = { query: { activeType: this.milestone.type } };
    Router.go('home', {}, options);
  }
});
