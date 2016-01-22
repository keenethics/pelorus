Template.stagesIndex.helpers({
  stages: function() {
    let stage = this.parentStage;
    if (!stage) {
      return Stages.find({type: 'years'}, {sort: {startsAt: -1}});
    }
    
    let type = Stages.relativeType(stage.type, +1);
    if (!type) return [];

    let children = stage._id ? stage.children().fetch() : [];
    return _.any(children) ? children : [{type}];
  }
});
