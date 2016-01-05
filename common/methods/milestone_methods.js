Meteor.methods({
  addMilestone: function(data) {
    check(data, {
      type: String,
      parentId: Match.Optional(String),
      period: Match.Optional(String)
    });

    if (!this.userId) {
      throw new Meteor.Error(
        'forbidden-action',
        'Can\'t add milestone. User must be logged in.'
      );
    }

    const bounds = Milestones.boundsFor(
      moment(data.period),
      data.type
    );
    const milestone = _.extend(data, bounds, {userId: this.userId});

    return Milestones.insert(milestone);
  },

  copyMilestoneGoals: function(fromId, toId) {
    check(fromId, String);
    check(toId, String);
  }
});
