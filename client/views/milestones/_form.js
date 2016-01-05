Template._milestonesForm.onCreated(function() {
  this.selectedType = new ReactiveVar(this.data.type || 'week');
  this.selectedParentId = new ReactiveVar();
});

Template._milestonesForm.onRendered(function() {
  this.autorun(()=> {
    let selectedParentId = this.selectedParentId.get();
    let parentMilestone = Milestones.findOne(selectedParentId);
    if (parentMilestone && parentMilestone.type !== 'strategic') {
      let parentPeriod = moment(parentMilestone.period);
      let year = parentPeriod.year();
      let month = Number(parentPeriod.month()) + 1;
      let week = Number(parentPeriod.week());
      let dateStr = year;
      let $input = this.$('#period');
      if (this.selectedType.get() === 'week') {
        let weekStr = week < 10 ? '0' + week : week;
        dateStr += '-W' + weekStr;
      } else {
        let monthStr = month < 10 ? '0' + month : month;
        dateStr += '-' + monthStr;
      }
      $input[0].defaultValue = dateStr;
    }
  });
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

