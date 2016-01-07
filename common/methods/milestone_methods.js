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

  copyMilestoneGoals: function(toId) {
    check(toId, String);

    this.unblock();

    if (!this.userId) {
      throw new Meteor.Error(
        'forbidden-action',
        'Error copying goals: user should be logged in.'
      );
    }

    const childMilestone = Milestones.findOne({
      _id: toId,
      userId: this.userId
    });
    const parentMilestone = childMilestone.parent();

    if (!(parentMilestone && childMilestone)) {
      throw new Meteor.Error(
        'forbidden-action',
        'Error copying goals: receiver or source milestone not found.'
      );
    }

    const parentGoals = Goals.find({
      milestoneId: parentMilestone._id,
      userId: this.userId,
      $or: [
        { completed: false },
        {
          completed: {
            $exists: false
          }
        }
      ]
    });

    return parentGoals.map(parentGoal => {
      let childGoal = {
        title: parentGoal.title,
        parentId: parentGoal._id,
        milestoneId: toId,
        userId: parentGoal.userId,
        pctOfParentGoal: parentGoal.completedPct,
        completedPct: 0
      };

      return Goals.insert(childGoal);
    });
  }
});
