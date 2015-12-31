Template._goalsForm.helpers({
  'parents': function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  },
});

Template._goalsForm.events({
  'click .js-insert-goal': function(e, t) {
    // TODO: Refactor validations and posting
    let $priority = t.$('#priority');
    let $title = t.$('#title');
    let title = $title.val();
    let parentId = t.$('#parentId').val();
    let priority = $priority.val();
    if (!title) {
      return $title.parent('.form-group').addClass('has-error');
    }
    if (!priority || priority > Meteor.App.MAX_GOAL_PRIORITY) {
      return $priority.parent('.form-group').addClass('has-error');
    }

    let doc = {
      'title': title,
      'priority': priority,
      'milestoneId': this.milestone._id,
      'userId': Meteor.userId(),
    };

    if (!!parentId) {
      doc.parentId = parentId;
    }

    Goals.insert(doc);
    let $modal = $('.modal');
    $modal.modal('hide');
    $modal.remove();
  },
});

