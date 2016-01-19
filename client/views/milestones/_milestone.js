Template._milestone.events({
  'click .js-add-goal': function(e) {
    if (!Meteor.user()) return;
    e.preventDefault();
    Template._formModal.show({
      title: 'Add Goal',
      template: '_goalsForm',
      data: { milestone: this.milestone, goal: {} }
    });
  },
  'click .bar': function() {
    const options = { query: { activeType: this.milestone.type } };
    Router.go('home', {}, options);
  }
});
