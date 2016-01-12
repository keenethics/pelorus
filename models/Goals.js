Goals = new Mongo.Collection('goals');

Goals.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  parentId: {
    type: Match.OneOf(String, null),
    label: 'Parent Goal ID',
    optional: true
  },
  rank: {
    type: Number,
    label: 'Goal rank',
    optional: true
  },
  milestoneId: {
    type: String,
    label: 'Milestone ID' },
  userId: {
    type: String,
    label: 'User ID' },
  completedPct: {
    type: Number,
    label: 'Percent Completed',
    optional: true
  },
  pctOfParentGoal: {
    type: Number,
    label: 'Percent of Parent Goal',
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
  milestone: function() { return Milestones.findOne(this.milestoneId); }
});

if (Meteor.isServer) {
  Goals.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
  });
}
