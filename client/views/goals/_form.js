Template._goalsForm.helpers({
  parents: function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  }
});

Template._goalsForm.events({
  'click .js-insert-goal': function(e, t) {
    let progress = t.$('#progress').val();
    let goal = {
      title:       t.$('#title').val(),
      parentId:    t.$('#parentId').val(),
      milestoneId: this.milestone._id,
      userId:      Meteor.userId(),
      completedPct: progress,
    };

    //TODO: Refactor validations and posting
    if(this.milestone.type != 'strategic' && !t.$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if(!t.$('#title').val()) return $('#title').parent('.form-group').addClass('has-error');
    if(!progress || progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
    }

    Goals.insert(goal);
    $('#formModal').modal('hide');
  },
});