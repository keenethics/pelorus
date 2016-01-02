Template._milestonesForm.onCreated(function() {
  this.selectedType = new ReactiveVar(this.data.type || 'week');
});

Template._milestonesForm.helpers({
  'parents': function() {
    let type = Template.instance().selectedType.get();
    return type && Milestones.find({
      'type': Milestones.parentType(type),
      'userId': Meteor.userId() });
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
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, t) {
    let type = t.selectedType.get();
    // TODO: Refactor validations and posting
    if (type !== 'strategic' && !$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if (type !== 'strategic' && !$('#period').val()) {
      return $('#period').parent('.form-group').addClass('has-error');
    }

    let period = t.$('#period').val();

    // TODO: pass date format to moment.js
    Milestones.insert(_.extend(Milestones.boundsFor(moment(period), type), {
      'period': period,
      'parentId': t.$('#parentId').val(),
      'type': type,
      'userId': Meteor.userId()
    }));

    let $modal = $('#formModal');
    $modal.modal('hide');
    $modal.remove();
  },
  'change #type': function(e, t) {
    let type = e.currentTarget.value;
    if (type) {
      t.selectedType.set(type);
    }
  }
});

