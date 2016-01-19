Template._milestonesForm.onCreated(function() {
  const currentYear = moment().year();

  this.selectedType = new ReactiveVar(this.data.type || 'week');
  this.firstYear = new ReactiveVar(currentYear);
  this.lastYear = new ReactiveVar(currentYear + 5);
  this.error = new ReactiveVar(null);
});

Template._milestonesForm.onRendered(function() {
  this.autorun(() => {
    const err = this.error.get();

    if (err) {
      this.$('.alert').show();
    } else {
      this.$('.alert').hide();
    }
  });
});

Template._milestonesForm.helpers({
  types: () => {
    return Milestones.validTypes;
  },
  periodInputType: (type) => {
    return type && type === 'year' ? 'number' : type;
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, tpl) {
    const data = tpl.$('form').serializeJSON();
    const period = data.period || `${data.firstYear}-${data.lastYear}`;
    const milestone = {period, type: data.type};

    Meteor.call('addMilestone', milestone, !!data.copyGoals, (err) => {
      if (!err) return $('#formModal').modal('hide');

      tpl.error.set(err.reason);
      if (err.error === 'period-invalid') {
        let periodErrMsg = tpl.$('.period-err-msg');
        periodErrMsg.text(` (${err.reason})`);
        return tpl.$('#period').parent('.form-group').addClass('has-error');
      }
    });
  },
  'change #type': function(e, t) {
    let type = e.currentTarget.value;
    if (type) {
      t.selectedType.set(type);
    }
  },
  'click .js-error-close': function(e, tpl) {
    tpl.error.set(null);
  }
});
