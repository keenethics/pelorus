/*prepopulates db with user's testing data if it's empty
and app is in development mode.*/

let mode = process.env.NODE_ENV;

Meteor.startup(function() {
  if (mode != 'development') return;
  YAML.eval(Assets.getText('users.yml')).users.forEach(user => {
    if (Meteor.users.find({'username': user.username}).count() > 0) return;

    let milestones = YAML.eval(Assets.getText('milestones.yml')).milestones;
    let goals = YAML.eval(Assets.getText('goals.yml')).goals;

    let userId = Accounts.createUser(user);
    let milestoneId = null;

    milestones.forEach(milestone => {
      milestoneData = _.extend(milestone, {userId, parentId: milestoneId});
      milestoneId = Milestones.insert(milestoneData);

      goals.forEach(goal => {
        Goals.insert(_.extend(goal, {userId, milestoneId}));
      });
    })
  });
});
