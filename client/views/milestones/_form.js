Template._milestonesForm.onCreated(function() {
  this.curType = new ReactiveVar(this.data.type || 'year');
});

Template._milestonesForm.helpers({
  'parents': function() {
    let type = Template.instance().curType.get();
    return type && Milestones.find({
      'type': Milestones.parentType(type),
      'userId': Meteor.userId() });
  },
  'periodTitle': function() {
    let type = Template.instance().curType.get();
    return type && s.capitalize(type);
  },
  'periodInputType': function() {
    let type = Template.instance().curType.get();
    return type && type === 'year' ? 'number' : type;
  },
  'type': function() {
    return Template.instance().curType.get();
  },
  'types': function() {
    return Milestones.validTypes;
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, t) {
    let type = t.curType.get();
    // TODO: Refactor validations and posting
    if (type !== 'strategic' && !$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }

    let period = t.$('#period').val();

    // TODO: pass date format to moment.js
    Milestones.insert(_.extend(Milestones.boundsFor(moment(period), type), {
      'period': period || undefined,
      'parentId': t.$('#parentId').val(),
      'type': type,
      'userId': Meteor.userId()
    }), function(err) {
      err && toastr.error(`Milestones with the same types
        should be with the different periods.`, 'Error');
    });

    let $modal = $('#formModal');
    $modal.modal('hide');
    $modal.remove();
  },
  'change #type': function(e, t) {
    let type = e.currentTarget.value;
    if (type) {
      t.curType.set(type);
    }
  }
});

