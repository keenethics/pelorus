
function loadingSeeds(seeds, parentGoal) {
  let goals = JSON.parse(JSON.stringify(seeds));
  let userId = null;
  let milestoneId = null;
  let goalParentId = null;

  seeds.forEach(milestone => {
    let seedChildrens = seeds[0].children;
    const bounds = Milestones.boundsFor(milestone.period, milestone.type);
    milestoneData = _.extend(milestone, bounds, { userId });
    milestoneId = Milestones.insert(milestoneData);

    goals.forEach(goal => {
      goalData = _.extend(goal, {userId, milestoneId, parentId: parentGoal});
      goalParentId = Goals.insert(goalData);
    });

    if (seedChildrens) loadingSeeds(seedChildrens, goalParentId);
  });
}

Meteor.startup(function() {
  if (Milestones.find({userId: null}).count()) return;
  let seeds = YAML.eval(Assets.getText('introSeeds.yml')).seeds;
  loadingSeeds(seeds);
});
