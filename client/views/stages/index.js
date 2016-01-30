Template.stagesIndex.helpers({
  stages: function() {
    let parentStage = this.parentStage;
    let type = parentStage ? Stages.relativeType(parentStage.type, 1) : 'years';

    if (!type) return [];

    if (parentStage) {
      var children = parentStage._id && parentStage.children();
    } else {
      var children = Stages.find({type: 'years'}, {sort: {startsAt: -1}});
    }
    
    return children && children.count() > 0 ? children : [{type}];
  }
});
