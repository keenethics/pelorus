import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import Stages from '/imports/api/stages/stages.js';
import { Match } from 'meteor/check';
export const Goals = new Mongo.Collection('goals');

Goals.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    min: 3,
    max: 140,
  },
  parentId: {
    type: Match.OneOf(String, null),
    label: 'Parent goal ID',
    optional: true,
  },
  rank: {
    type: Number,
    label: 'Goal rank',
    optional: true,
  },
  stageId: {
    type: String,
    label: 'Stage ID',
  },
  userId: {
    type: String,
    label: 'User ID',
    optional: true,
  },
  progress: {
    type: Number,
    label: 'Progress',
    min: 0,
    max: 100,
    optional: true,
  },
}));

Goals.helpers({
  parent: function () { return Goals.findOne(this.parentId); },
  children: function() {
    return Goals.find({ parentId: this._id }, { sort: { rank: 1 } });
  },
  stage: function () { return Stages.findOne(this.stageId); },
  createChild: function (stageId) {
    const data = { stageId, parentId: this._id, progress: 0 };
    return Goals.insert(_.extend(_.pick(this, 'title', 'userId', 'rank'), data));
  },
});

if (Meteor.isServer) {
  Goals.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
  });
}
