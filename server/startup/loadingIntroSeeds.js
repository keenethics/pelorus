/* loading demo data for unregistered users */

function loadingSeeds(seeds, parentId) {
  seeds.forEach(seed => {
    let userId = null;
    const bounds = Milestones.boundsFor(seed.period, seed.type);

    let milestoneData = _.extend({userId}, seed, bounds);
    let milestoneId = Milestones.insert(milestoneData);

    let goalData = _.extend({userId, milestoneId, parentId}, seed);
    let goalParentId = Goals.insert(goalData);

    if (seed.children) loadingSeeds(seed.children, goalParentId);
  });
}

Meteor.startup(function() {
  if (Milestones.find({userId: null}).count()) return;
  let seeds = YAML.eval(Assets.getText('introSeeds.yml')).seeds;
  loadingSeeds(seeds);
});
