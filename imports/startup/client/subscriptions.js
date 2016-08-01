import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.subscribe('Stages');
  Meteor.subscribe('Goals');
});
