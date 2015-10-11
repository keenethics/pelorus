Template._milestonesForm.helpers({
  parents: function() {
    return Milestones.find({ type: Milestones.parentType(this.type), userId: Meteor.userId() });
  },
  periodTitle:     function() { return s.capitalize(this.type) },
  periodInputType: function() { return this.type == 'year' ? 'number' : this.type }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, t) {
   
    //TODO: Refactor validations and posting
    if(this.type != 'strategic' && !$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if(this.type != 'strategic' && !$('#period').val()) {
      return $('#period').parent('.form-group').addClass('has-error');
    }

    var period = t.$('#period').val();
    
    // TODO: pass date format to moment.js
    Milestones.insert(_.extend(Milestones.boundsFor(moment(period), this.type), {
      period:   period,
      parentId: t.$('#parentId').val(),
      type:     this.type,
      userId:   Meteor.userId()
    }));

    $('#formModal').modal('hide');
  }
});

