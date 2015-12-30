Template.navigation.events({
  'click .js-add-milestone': function(e) {
    var data = { }
    Blaze.renderWithData(Template._formModal, { title: 'Add Milestone', template: '_milestonesForm', data }, document.body);
  },
})

Template.navigation.helpers({
  canAddMilestones: function() {
    return Meteor.userId() && Session.get('canAddMilestones');
  },
})