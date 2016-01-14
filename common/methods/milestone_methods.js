Meteor.methods({
  addMilestone: function(data) {
    check(data, {type: String, period: String});

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

    const milestone = _.extend(data, bounds, {userId: this.userId});

    if (data.type !== 'years' && !Milestones._transform(milestone).parent()) {
      throw new Meteor.Error('period-invalid',
        'No parent milestone for this period.');
    }

    if (Milestones.find(existingQuery).count() > 0) {
      throw new Meteor.Error('period-invalid',
        'Milestone intersects existing one.');
    }

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
