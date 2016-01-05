Template._goalsForm.helpers({
  'parents': function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  }
});

Template._goalsForm.events({
  'click .js-save': function(e, t) {
    // TODO: Refactor validations and posting
    let $title = t.$('#title');
    let title = $title.val();
    let parentId = t.$('#parentId').val();
    let progress = t.$('#progress').val();

    if (!title) return $title.parent('.form-group').addClass('has-error');
    if(!progress || progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
    }

    let data = {
      'title': title,
      'priority': t.$('#priority').val(),
      'parentId': parentId ? parentId : undefined,
      'milestoneId': this.milestone._id,
      'userId': Meteor.userId(),
      'completedPct': progress
    };

    if(this.goal._id) {
      Goals.update(this.goal._id, {$set: data});
    } else {
      Goals.insert(data);
    }

    $('#formModal').modal('hide');
  },
});
