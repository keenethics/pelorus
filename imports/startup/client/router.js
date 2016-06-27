import '../../ui/layouts/basic.html';
import '../../ui/stages/index.js';
import '../../ui/home/_navigation.js';

Router.configure({
  layoutTemplate: 'basicLayout'
});

Router.route('/', {
  name: 'home',
  template: 'stagesIndex',
  data() {
    const activeType = this.params.query.activeType || 'week';
    return { activeType: new ReactiveVar(activeType) };
  },
  onAfterAction: function() {
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.onBeforeAction(function() {
  this.next();
}, { only: ['home'] });

Router.onBeforeAction(function() {
  this.next();
}, { except: ['home'] });