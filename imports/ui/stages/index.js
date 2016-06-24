import './index.html';
import './_stage.js';

import { Stages } from '/imports/api/stages/stages.js';



Template.stagesIndex.helpers({
  stages: function() {
    let stage = this.parentStage;
    if (!stage) return Stages.find({type: 'years'}, {sort: {startsAt: -1}});
    
    let type = Stages.relativeType(stage.type, 1);
    if (!type) return [];

    let children = stage.children();
    return children.count() > 0 ? children : [Stages._transform({type})];
  }
});
