/* global Accounts*/

Accounts.onCreateUser(function(options, user) {
  Milestones.insert({'type': 'strategic', 'userId': user._id});
  return user;
});
