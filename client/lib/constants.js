// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error(
    'Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  'NAME': 'Pelorus',
  'DESCRIPTION': `Pelorus is a simple yet highly-effective planning tool that
                   helps reaching goals in a way of successive approximations
                   (based on Dynamic programming).`
};
