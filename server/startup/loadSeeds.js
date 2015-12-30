/*prepopulates db with user's testing data if it's empty
and app is in development mode.*/

let mode = process.env.NODE_ENV;

function loadUser(user) {
  let userAlreadyExists = typeof Meteor.users.findOne({
    username: user.username }) === 'object';

  if (!userAlreadyExists) {
    let userId = Accounts.createUser(user);
    let milestones = YAML.eval(Assets.getText('milestones.yml'));
    let milestoneId = '';
    let goals = YAML.eval(Assets.getText('goals.yml'));

    for (key in milestones) {
      if (milestones.hasOwnProperty(key)) {
        let milestone = milestones[key];
        milestone.userId = userId;
        milestoneId = Milestones.insert(milestone);
      }
    }

    for (key in goals) {
      if (goals.hasOwnProperty(key)) {
        let goal = goals[key];
        goal.userId = userId;
        goal.milestoneId = milestoneId;
        Goals.insert(goal);
      }
    }
  }
}

if ( Meteor.isServer && mode === 'development' ) {
  Meteor.startup(function() {
    let users = YAML.eval(Assets.getText('users.yml'));
    for (key in users) {
      if (users.hasOwnProperty(key)) {
        loadUser(users[key]);
      }
    }
  });
}
