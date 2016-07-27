import { Meteor } from 'meteor/meteor';
import { Goals } from './goals.js';

Meteor.publish('Goals', function () {
  return Goals.find({ userId: this.userId || null });
});
