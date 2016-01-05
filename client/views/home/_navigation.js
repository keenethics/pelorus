Template.navigation.events({
  'click .js-add-milestone': function() {
    let data = { };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Milestone',
      'template': '_milestonesForm', data }, document.body);
  },
  'click .user-language': function( e ) {
    let chosenLang = $(e.target).text();
    Session.set('language', chosenLang);
    if (Meteor.user()) {
      Meteor.users.update({'_id': Meteor.userId()}, {'$set':
                        {'profile.language': chosenLang}});
    }
  }
});

Accounts.onLogin(function() {
  let language = Session.get('language');
  Meteor.users.update({'_id': Meteor.userId()}, {'$set':
                        {'profile.language': language}});
});

Template.navigation.helpers({
  'canAddMilestones': function() {
    return Meteor.userId() && Session.get('canAddMilestones');
  }
});

if (Meteor.isServer) {
  Meteor.users.allow({
    'update': function(userId, user) {
      return userId === user._id;
    }
  });
}
