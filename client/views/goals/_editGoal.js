Template._editGoal.onRendered(function() {
  let that = Template.instance().data;
  let measurable = Goals.findOne(that.goalId).isMeasurable;
  $('#measurable').prop('checked', measurable);
  $('#progress').prop('disabled', !measurable);
});

Template._editGoal.helpers({
  parents: function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  },
  title: function() {
    return Goals.findOne(this.goalId).title || '';
  },
  progress: function() {
    return Goals.findOne(this.goalId).completedPct || '';
  },
});

Template._editGoal.events({
  'click .edit-goal': function(e, t) {
    let completedPct = Goals.findOne(this.goalId).completedPct;
    let measurable = t.$('#measurable').prop('checked');
    let progress = t.$('#progress').val();
    let parentId = t.$('#parentId').val();
    let title = t.$('#title').val();
    let goal = {
      'title': title,
      'parentId': parentId,
      'isMeasurable': measurable,
    };

    if (this.milestone.type != 'strategic' && !parentId) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if (!title) {
      return $('#title').parent('.form-group').addClass('has-error');
    }
    if(progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
    }
    if(measurable && !progress){
      return $('#progress').parent('.form-group').addClass('has-error');
    }
    if(measurable) {
      goal.completedPct = progress || 0;
    } else if(!measurable && completedPct) {
      goal.completedPct = 0;
    }

    Goals.update(this.goalId, {
      $set: goal
    }, function(error, result) {
      if (error) {
        console.log(error);
      }
    });
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