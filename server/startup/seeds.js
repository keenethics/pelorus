
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
    }
  });
}
