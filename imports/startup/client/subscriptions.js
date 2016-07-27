import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  Meteor.subscribe('Stages');
  Meteor.subscribe('Goals');
});
