Router.route('/', {
  name: 'home',
  template: function() {
    return Meteor.user() ? 'milestonesIndex' : 'landing_page';
  },
  data() {
    const activeType = this.params.query.activeType || 'week';

    return { activeType: new ReactiveVar(activeType) };
  },
  onAfterAction: function() {
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/about', {
  name: 'about'
});

Router.route('/milestones/:_id', {
  name: 'milestonesShow',
  data: function() {
    return { milestone: Milestones.findOne(this.params._id) };
  }
});

Router.onBeforeAction(function() {
  Session.set('canAddMilestones', true);
  this.next();
}, { only: ['home'] });

Router.onBeforeAction(function() {
  Session.set('canAddMilestones', false);
  this.next();
}, { except: ['home'] });
