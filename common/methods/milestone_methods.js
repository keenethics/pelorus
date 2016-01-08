Meteor.methods({
  addMilestone: function(data) {
    check(data, {
      type: String,
      period: String
    });

    if (!this.userId) {
      throw new Meteor.Error(
        'forbidden-action',
        'User should be logged in.'
      );
    }

    const existingMilestone = Milestones.findOne({
      userId: this.userId,
      period: data.period,
      type: data.type
    });

    if (existingMilestone) {
      throw new Meteor.Error('period-invalid',
        'Milestone for this period already created!');
    }

    const bounds = Milestones.boundsFor(moment(data.period), data.type);
    const milestone = _.extend(data, bounds, {userId: this.userId});

    return Milestones.insert(milestone);
  },

  copyGoalsFromParentMilestone: function(milestoneId) {
    check(milestoneId, String);

    this.unblock();

    if (!this.userId) {
      throw new Meteor.Error(
        'forbidden-action',
        'User should be logged in.'
      );
    }

    const milestone = Milestones.findOne({
      _id: milestoneId,
      userId: this.userId
    });

    const parentMilestone = milestone && milestone.parent();

    if (!milestone || !parentMilestone) {
      throw new Meteor.Error(
        'forbidden-action',
        'Receiver or source milestone not found.'
      );
    }

    return parentMilestone.goals({completed: { $ne: true }}).map(goal => {
      return Goals.insert({
        title: goal.title,
        parentId: goal._id,
        milestoneId: milestoneId,
        userId: goal.userId,
        completedPct: 0
      });
    });
  }
});
