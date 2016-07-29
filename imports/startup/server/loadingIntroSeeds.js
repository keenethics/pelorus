import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import yaml from 'js-yaml';
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

Meteor.startup(() => {
  if (Stages.find({ userId: null }).count()) return;
  const seeds = yaml.safeLoad(Assets.getText('intro_seeds.yml'), 'utf8').seeds;
  loadingSeeds(seeds);
});
