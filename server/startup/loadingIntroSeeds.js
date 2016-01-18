
function loadingSeeds(milestones, goals, parentGoal) {
  let mchildrens = milestones[0].children;
  let gchildrens = goals[0].children;
  let userId = null;
  let milestoneId = null;
  let gparent = null;

  milestones.forEach(milestone => {
    const bounds = Milestones.boundsFor(milestone.period, milestone.type);
    milestoneData = _.extend(milestone, bounds, { userId });
    milestoneId = Milestones.insert(milestoneData);

    goals.forEach(goal => {
      goalData = _.extend(goal, {userId, milestoneId, parentId: parentGoal});
      gparent = Goals.insert(goalData);
    });

    if (mchildrens) loadingSeeds(mchildrens, gchildrens, gparent);
  });
}

Meteor.startup(function() {
  if (Milestones.find({userId: null}).count()) return;
  let milestones = YAML.eval(Assets.getText('introSeeds.yml')).seeds;
  let goals = YAML.eval(Assets.getText('introSeeds.yml')).seeds;
  loadingSeeds(milestones, goals);
});
