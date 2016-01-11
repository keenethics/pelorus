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

    const bounds = Milestones.boundsFor(data.period, data.type);

    let existingQuery = {
      userId: this.userId,
      type: data.type
    };
    let existingError;

    if (data.type === 'strategic') {
      existingError = 'New strategic milestone intersects existing one.';
      existingQuery.$or = [
        { startsAt: { $gte: bounds.startsAt, $lte: bounds.endsAt } },
        { endsAt: {$gte: bounds.startsAt, $lte: bounds.endsAt} }
      ];
    } else {
      existingError = 'Milestone for this period already created!';
      existingQuery.startsAt = bounds.startsAt;
      existingQuery.endsAt = bounds.endsAt;
    }

    const existingMilestone = Milestones.findOne(existingQuery);

    if (existingMilestone) {
      throw new Meteor.Error('period-invalid', existingError);
    }

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
