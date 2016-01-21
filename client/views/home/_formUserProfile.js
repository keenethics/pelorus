Template._formUserProfile.helpers({
  days: () => [1, 7].map(n => ({name: moment.weekdays(n), value: n}))
});

Template._formUserProfile.events({
  'click .js-save': function(e, t) {
    Meteor.call('updateUserFirstDayOfWeek', Number(t.$('#dayDow').val()));
    $('#formModal').modal('hide');
  }
});
