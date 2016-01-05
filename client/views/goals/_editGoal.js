// Template._editGoal.onRendered(function() {
//   let that = Template.instance().data;
//   let measurable = Goals.findOne(that.goalId).isMeasurable;
//   $('#measurable').prop('checked', measurable);
//   $('#progress').prop('disabled', !measurable);
// });

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
    let progress = t.$('#progress').val();
    let parentId = t.$('#parentId').val();
    let title = t.$('#title').val();
    let goal = {
      'title': title,
      'parentId': parentId,
      'completedPct': progress,
    };

    if (this.milestone.type != 'strategic' && !parentId) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if (!title) {
      return $('#title').parent('.form-group').addClass('has-error');
    }
    if(!progress || progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
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
});