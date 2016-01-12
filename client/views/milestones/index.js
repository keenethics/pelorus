Template.milestonesIndex.helpers({
  'milestones': function() {
    let milestone = this.parentMilestone;
    if (!milestone) {
      return Milestones.find({type: 'years'}, {sort: {startsAt: -1}});
    }
    
    let type = Milestones.relativeType(milestone.type, +1);
    if (!type) return [];

    let children = milestone._id ? milestone.children().fetch() : [];
    return _.any(children) ? children : [{type}];
  }
});
