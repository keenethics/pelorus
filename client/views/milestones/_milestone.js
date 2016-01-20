Template._milestone.events({
  'click .js-add-goal': function(e) {
    e.preventDefault();
    if (!Meteor.user()) {
      return Template._formModal.show({
        template: 'forUnregistered',
        title: 'Welcome'
      });
    }
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
