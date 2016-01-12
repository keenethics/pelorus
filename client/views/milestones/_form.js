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
  periodTitle: function() {
    let type = Template.instance().selectedType.get();
    return type && s.capitalize(type);
  },
  periodInputType: function() {
    let type = Template.instance().selectedType.get();
    return type && type === 'year' ? 'number' : type;
  },
  type: function() {
    return Template.instance().selectedType.get();
  },
  types: function() {
    return Milestones.validTypes;
  },
  firstYear: function() {
    return Template.instance().firstYear.get();
  },
  lastYear: function() {
    return Template.instance().lastYear.get();
  },
  error: function() {
    return Template.instance().error.get();
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, tpl) {
    const formData = tpl.$('form').serializeJSON();
    const milestoneData = _.omit(formData,
      ['copyGoals', 'firstYear', 'lastYear']
    );
    const $modal = $('#formModal');

    milestoneData.period = `${formData.firstYear}-${formData.lastYear}`;

    Meteor.call('addMilestone', milestoneData, function(err, _id) {
      if (err) {
        tpl.error.set(err.reason);
        if (err.error === 'period-invalid') {
          let periodErrMsg = tpl.$('.period-err-msg');
          periodErrMsg.text(` (${err.reason})`);
          return tpl.$('#period').parent('.form-group').addClass('has-error');
        }
      } else {
        if (formData.copyGoals) {
          Meteor.call('copyGoalsFromParentMilestone', _id);
        }

        $modal.modal('hide');
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
