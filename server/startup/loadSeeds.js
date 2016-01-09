/* prepopulates db with user's testing data if it's empty
and app is in development mode. */

let mode = process.env.NODE_ENV;

Meteor.startup(function() {
  if (mode !== 'development') return;
  YAML.eval(Assets.getText('users.yml')).users.forEach(user => {
    if (Meteor.users.find({'username': user.username}).count() > 0) return;

    let milestones = YAML.eval(Assets.getText('milestones.yml')).milestones;
    let goals = YAML.eval(Assets.getText('goals.yml')).goals;

    let userId = Accounts.createUser(user);
    let milestoneId = null;
    let goalId = null;
    let parentGoalIds = [];

    milestones.forEach(milestone => {
      milestoneData = _.extend(milestone, { userId });
      milestoneId = Milestones.insert(milestoneData);

      goals.forEach(goal => {
        let parentGoalIndex = parentGoalIds.length - 3;
        goalData = _.extend(goal, {userId, milestoneId,
                          'parentId': parentGoalIds[parentGoalIndex]});
        goalId = Goals.insert(goalData);
        parentGoalIds.push(goalId);
      });
    });
  });
});
