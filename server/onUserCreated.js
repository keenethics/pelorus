/* global Accounts*/

Accounts.onCreateUser(function(options, user) {
  Milestones.insert({'type': 'years', 'userId': user._id});
  return user;
});
