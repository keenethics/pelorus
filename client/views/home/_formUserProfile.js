Template._formUserProfile.helpers({
  days: function() {
    return [{name: moment.weekdays(1), value: 1},
            {name: moment.weekdays(7), value: 7}];
  }
});

Template._formUserProfile.events({
  'click .js-save': function(e, t) {
    Meteor.call('updateUserFirstDayOfWeek', Number(t.$('#dayDow').val()));
    $('#formModal').modal('hide');
  }
});
