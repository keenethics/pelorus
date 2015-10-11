Template.home.helpers({
  milestoneTypes: () => Milestones.validTypes,
  currentMilestoneData: function(type) {
    var now = new Date();
    return {
      milestone: Milestones.findOne({ type, startsAt: {$lte: now}, endsAt: {$gte: now} }),
      type
    }
  }
});