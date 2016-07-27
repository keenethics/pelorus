import '/imports/api/yaml.min.js';
import { Meteor } from 'meteor/meteor';
import { Stages } from '/imports/api/stages/stages.js';
import { Goals } from '/imports/api/goals/goals.js';

function loadingSeeds(seeds, parentId) {
  seeds.forEach(seed => {
    const userId = null;
    const bounds = Stages.boundsFor(seed.period, seed.type);

    const stageData = _.extend({ userId }, seed, bounds);
    const stageId = Stages.insert(stageData);

    const goalData = _.extend({ userId, stageId, parentId }, seed);
    const goalParentId = Goals.insert(goalData);

    if (seed.children) loadingSeeds(seed.children, goalParentId);
  });
}

Meteor.startup(function () {
  if (Stages.find({ userId: null }).count()) return;
  const seeds = YAML.eval(Assets.getText('intro_seeds.yml')).seeds;
  loadingSeeds(seeds);
});
