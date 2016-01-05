Template._milestonesForm.onCreated(function() {
  this.selectedType = new ReactiveVar(this.data.type || 'week');
});

Template._milestonesForm.helpers({
  parents: function() {
    let type = Template.instance().selectedType.get();
    return type && Milestones.find({
      type: Milestones.relativeType(type, -1),
      userId: Meteor.userId() });
  },
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
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, tpl) {
    const formData = tpl.$('form').serializeJSON();
    const milestoneData = _.omit(formData, ['copyGoals']);
    const $modal = $('#formModal');

    Meteor.call('addMilestone', milestoneData, function(err, _id) {
      if (err) {
        if (err.error === 'period-invalid') {
          let periodErrMsg = tpl.$('.period-err-msg');
          periodErrMsg.text(` (${err.reason})`);
          return tpl.$('#period').parent('.form-group').addClass('has-error');
        }
      } else {
        if (formData.copyGoals) {
          Meteor.call('copyMilestoneGoals', milestoneData.parentId, _id);
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
  }
});
