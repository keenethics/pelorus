import { Meteor } from 'meteor/meteor';
import { Stages } from './stages.js';

if (Meteor.isServer) {
  Meteor.publish('Stages', function () {
    return Stages.find({ userId: this.userId || null });
  });
}
