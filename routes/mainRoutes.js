Router.route('/', {
  name: 'home',
  template: function() {
    return Meteor.user() ? 'home' : 'landing_page';
  },
  onAfterAction: function () {
    SEO.set({ title: 'Home -' + Meteor.App.NAME });

  }
  // waitOn: function() {
  //   return [
  //     Meteor.subscribe('milestones'),
  //     Meteor.subscribe('goals')
  //   ]
  // }
});

Router.route('/about', {
  name: 'about',
  template: 'about'
});

// Router.route('', {

// });