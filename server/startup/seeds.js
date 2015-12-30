
/*prepopulates db with user's testing data if it's empty
and app is in development mode.*/

let mode = process.env.NODE_ENV;

if ( Meteor.isServer && mode === 'development' ) {
  Meteor.startup(function() {
    if ( Meteor.users.find().count() === 0 ) {
      Accounts.createUser({
        'username': 'test',
        'email': 'test@email.com',
        'password': 'abc123',
        'profile': {
          'first_name': 'fname',
          'last_name': 'lname',
        },
      });
      Milestones.insert({
        'period': 2016,
        'type': 'year',
        'userId': Meteor.users.findOne({'username': 'test'})._id,
        'parentId': '',
        'startsAt': '',
        'endsAt': '',
      });
      Milestones.insert({
        'period': '2016-1',
        'type': 'month',
        'userId': Meteor.users.findOne({'username': 'test'})._id,
        'parentId': Milestones.findOne({'type': 'year'})._id,
        'startsAt': '',
        'endsAt': '',
      });
      Milestones.insert({
        'period': '2016-W3',
        'type': 'week',
        'userId': Meteor.users.findOne({'username': 'test'})._id,
        'parentId': Milestones.findOne({'type': 'month'})._id,
        'startsAt': '',
        'endsAt': '',
      });
      Goals.insert({
        'title': 'Made list of tasks',
        'parentId': '',
        'milestoneId': Milestones.findOne({'type': 'year'})._id,
        'userId': Meteor.users.findOne({'username': 'test'})._id,
        'completedPct': '',
        'pctOfParentGoal': '',
      });
      Goals.insert({
        'title': 'Made list task #1',
        'parentId': Goals.findOne({'title': 'Made list of tasks'})._id,
        'milestoneId': Milestones.findOne({'type': 'month'})._id,
        'userId': Meteor.users.findOne({'username': 'test'})._id,
        'completedPct': '',
        'pctOfParentGoal': '',
      });
    }
  });
}
