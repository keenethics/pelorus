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
