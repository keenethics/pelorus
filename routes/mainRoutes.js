Router.route('/', {
  name: 'home',
  template: function() {
    return Meteor.user() ? 'home' : 'landing_page';
  },
  onAfterAction: function () {
    SEO.set({ title: 'Home -' + Meteor.App.NAME });

  }
});

Router.route('/about', {
  name: 'about'
});

Router.route('/milestones/:_id', {
  name: 'milestonesShow',
  data: function() { return { milestone: Milestones.findOne(this.params._id) }; }
});
