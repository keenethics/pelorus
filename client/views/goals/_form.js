Template._goalsForm.helpers({
  parents: function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  }
});

Template._goalsForm.events({
  'click .js-insert-goal': function(e, t) {
   
    //TODO: Refactor validations and posting
    if(this.milestone.type != 'strategic' && !t.$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if(!t.$('#title').val()) return $('#title').parent('.form-group').addClass('has-error');

    Goals.insert({
      title:       t.$('#title').val(),
      parentId:    t.$('#parentId').val(),
      milestoneId: this.milestone._id,
      userId:      Meteor.userId()
    });

    $('#formModal').modal('hide');
  }
});

