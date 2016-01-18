Router.route('/', {
  name: 'home',
  template: 'milestonesIndex',
  data() {
    const activeType = this.params.query.activeType || 'week';

    return { activeType: new ReactiveVar(activeType) };
  },
  onAfterAction: function() {
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/milestones/:_id', {
  name: 'milestonesShow',
  data: function() {
    return { milestone: Milestones.findOne(this.params._id) };
  }
});

Router.onBeforeAction(function() {
  this.next();
}, { only: ['home'] });

Router.onBeforeAction(function() {
  this.next();
}, { except: ['home'] });
