Template._goalsForm.helpers({
  parents: function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  }
});

Template._goalsForm.events({
  'click .js-insert-goal': function(e, t) {
    let measurable = t.$('#measurable').prop('checked');
    let progress = t.$('#progress').val();
    let goal = {
      title:       t.$('#title').val(),
      parentId:    t.$('#parentId').val(),
      milestoneId: this.milestone._id,
      userId:      Meteor.userId(),
      isMeasurable : measurable,
    };

    //TODO: Refactor validations and posting
    if(this.milestone.type != 'strategic' && !t.$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if(!t.$('#title').val()) return $('#title').parent('.form-group').addClass('has-error');
    if(progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
    }
    if(measurable && !progress){
      return $('#progress').parent('.form-group').addClass('has-error');
    }
    if(measurable) {
      goal.completedPct = progress;
    }

    Goals.insert(goal);
    $('#formModal').modal('hide');
  },
  'change #measurable': function (e, t) {
    let checked = t.$('#measurable').prop('checked');
    $('#progress').prop('disabled', !checked);
    if(!checked) {
      $('#progress').val('');
    }
  }
});