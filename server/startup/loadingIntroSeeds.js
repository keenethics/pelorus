/* loading demo data for unregistered users */

function loadingSeeds(seeds, parentGoal) {
  let userId = null;
  let milestoneId = null;
  let goalParentId = null;

  seeds.forEach(seed => {
    const bounds = Milestones.boundsFor(seed.period, seed.type);

    let milestoneData = _.extend({ userId }, seed, bounds);
    milestoneId = Milestones.insert(milestoneData);

    let goalData = _.extend({userId, milestoneId, parentId: parentGoal}, seed);
    goalParentId = Goals.insert(goalData);

    if (seed.children) loadingSeeds(seed.children, goalParentId);
  });
}

Meteor.startup(function() {
  if (Milestones.find({userId: null}).count()) return;
  let seeds = YAML.eval(Assets.getText('introSeeds.yml')).seeds;
  loadingSeeds(seeds);
});
