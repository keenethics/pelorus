Template._stagesForm.onCreated(function() {
  const currentYear = moment().year();

  this.selectedType = new ReactiveVar(this.data.type || 'week');
  this.firstYear = new ReactiveVar(currentYear);
  this.lastYear = new ReactiveVar(currentYear + 5);
  this.error = new ReactiveVar(null);
});

Template._stagesForm.helpers({
  types: () => {
    return Stages.validTypes;
  },
  periodInputType: (type) => {
    return type && type === 'year' ? 'number' : type;
  }
});

Template._stagesForm.events({
  'click .js-insert-stage': function(e, tpl) {
    const data = tpl.$('form').serializeJSON();
    const period = data.period || `${data.firstYear}-${data.lastYear}`;
    const stage = {period, type: data.type};

    Meteor.call('addStage', stage, !!data.copyGoals, (err) => {
      if (!err) return $('#formModal').modal('hide');

      tpl.error.set(err.reason);

      //ToDo: needs refactoring
      if (err.error === 'period-invalid') {
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
