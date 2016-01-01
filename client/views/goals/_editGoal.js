Template._editGoal.helpers({
  parents: function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  }
});

Template._editGoal.events({
  'click .edit-goal': function(e, t) {
    if (this.milestone.type != 'strategic' && !t.$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if (!t.$('#title').val()) {
      return $('#title').parent('.form-group').addClass('has-error');
    }

    let title = $('#title').val();
    let parentId = t.$('#parentId').val();

    Goals.update(this.goal._id, {
      $set: {
        'title': title,
        'parentId': parentId,
      }
    }, function(error, result) {
      if (error) {
        console.log(error);
      }
    });

    $('#formModal').modal('hide');
  }
});

