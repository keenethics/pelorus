import '/imports/api/yaml.min.js';


import { Stages } from '/imports/api/stages/stages.js';

function loadingSeeds(seeds, parentId) {
  
  seeds.forEach(seed => {
    let userId = null;
    const bounds = Stages.boundsFor(seed.period, seed.type);

    let stageData = _.extend({userId}, seed, bounds);
    let stageId = Stages.insert(stageData);

    let goalData = _.extend({userId, stageId, parentId}, seed);
    let goalParentId = Goals.insert(goalData);

    if (seed.children) loadingSeeds(seed.children, goalParentId);
  });
}

Meteor.startup(function() {
  if (Stages.find({userId: null}).count()) return;
  let seeds = YAML.eval(Assets.getText('intro_seeds.yml')).seeds;
  loadingSeeds(seeds);
});

