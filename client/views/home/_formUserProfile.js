Template._formUserProfile.helpers({
  firstDayOfWeek: function() {
    return [{name: 'Monday', value: 1}, {name: 'Sunday', value: 7}];
  }
});

Template._formUserProfile.events({
  'click .js-save': function(e, t) {
    let chosenDay = t.$('#firstDayOfWeek');
    let day = Number(chosenDay.val());

    Meteor.call('updateUserFirstDayOfWeek', day);

    $('#formModal').modal('hide');
  }
});
