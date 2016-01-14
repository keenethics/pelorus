Meteor.methods({
  addMilestone: function(data) {
    check(data, {type: String, period: String});

    let parentIndex = _.indexOf(Milestones.validTypes, data.type) - 1;
    let milestoneParent = Milestones.validTypes[parentIndex];

    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in.');
    }

    const bounds = Milestones.boundsFor(data.period, data.type);

    const existingQuery = {
      userId: this.userId,
      type: data.type,
      $or: [
        { startsAt: { $gte: bounds.startsAt, $lte: bounds.endsAt } },
        { endsAt: { $gte: bounds.startsAt, $lte: bounds.endsAt } }
      ]
    };

    const parentQuery = {
      $and: [
        { type: milestoneParent },
        { userId: this.userId },
        { startsAt: { $lte: bounds.startsAt } },
        { endsAt: { $gte: bounds.endsAt } }
      ]
    };

    if (milestoneParent && Milestones.find(parentQuery).count() === 0) {
      throw new Meteor.Error('period-invalid',
        'No parent milestone for this period.');
    }

    if (Milestones.find(existingQuery).count() > 0) {
      throw new Meteor.Error('period-invalid',
        'Milestone intersects existing one.');
    }

    const milestone = _.extend(data, bounds, {userId: this.userId});

    return Milestones.insert(milestone);
  },

  copyGoalsFromParentMilestone: function(milestoneId) {
    check(milestoneId, String);

    this.unblock();

    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in.');
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
