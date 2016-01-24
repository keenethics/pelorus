Goals = new Mongo.Collection('goals');

Goals.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  parentId: {
    type: Match.OneOf(String, null),
    label: 'Parent goal ID',
    optional: true
  },
  rank: {
    type: Number,
    label: 'Goal rank',
    optional: true
  },
  stageId: {
    type: String,
    label: 'Stage ID'
  },
  userId: {
    type: String,
    label: 'User ID',
    optional: true
  },
  completedPct: {
    type: Number,
    label: 'Percent Completed',
    optional: true
  },
  completed: {
    type: Boolean,
    label: 'Task completed',
    optional: true
  }
}));

Goals.helpers({
  parent: function() { return Goals.findOne(this.parentId); },
  children: function() {
    return Goals.find({parentId: this._id}, {sort: {rank: 1}});
  },
  stage: function() { return Stages.findOne(this.stageId); },
  createChild: function(stageId) {
    let data = {stageId, parentId: this._id, completedPct: 0};
    return Goals.insert(_.extend(_.pick(this, 'title', 'userId'), data));
  }
});

if (Meteor.isServer) {
  Goals.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
  });
}
