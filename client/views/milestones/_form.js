Template._milestonesForm.onCreated(function() {
  this.selectedType = new ReactiveVar(this.data.type || 'week');
  this.selectedParentId = new ReactiveVar();
});

Template._milestonesForm.helpers({
  'parents': function() {
    let type = Template.instance().selectedType.get();
    if (type) {
      let query = {
        'type': Milestones.relativeType(type, -1),
        'userId': Meteor.userId()
      };
      let firstParent = Milestones.findOne(query);
      firstParent && Template.instance().selectedParentId.set(firstParent._id);
      return Milestones.find(query);
    }
  },
  'periodTitle': function() {
    let type = Template.instance().selectedType.get();
    return type && s.capitalize(type);
  },
  'periodInputType': function() {
    let type = Template.instance().selectedType.get();
    return type && type === 'year' ? 'number' : type;
  },
  'type': function() {
    return Template.instance().selectedType.get();
  },
  'types': function() {
    return Milestones.validTypes;
  },
  'selectedParentId': function() {
    return Template.instance().selectedParentId.get();
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, t) {
    let type = t.selectedType.get();
    let parentId = t.selectedParentId.get();

    // TODO: Refactor validations and posting
    if (type !== 'strategic' && !parentId) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }

    let period = t.$('#period').val();

    // TODO: pass date format to moment.js
    Milestones.insert(_.extend(Milestones.boundsFor(moment(period), type), {
      'period': period || undefined,
      'parentId': parentId,
      'type': type,
      'userId': Meteor.userId()
    }), function(err) {
      if (err && err.error === 'period-invalid') {
        let periodErrMsg = t.$('.period-err-msg');
        periodErrMsg.text(` (${err.reason})`);
        return $('#period').parent('.form-group').addClass('has-error');
      }
      $('#formModal').$modal.modal('hide');
    });
  },
  'change #type': function(e, t) {
    let type = e.currentTarget.value;
    if (type) {
      t.selectedType.set(type);
    }
  },
  'change #parentId': function(e, t) {
    let parentId = e.currentTarget.value;
    if (parentId) {
      t.selectedParentId.set(parentId);
    }
  }
});

