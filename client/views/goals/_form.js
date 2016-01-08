Template._goalsForm.onCreated(function() {
  this.priority = new ReactiveVar(this.data.goal && this.data.goal.priority);
  this.parentId = new ReactiveVar();
});

Template._goalsForm.onRendered(function() {
  this.autorun(() => {
    let parentId = this.parentId.get();
    let parentPriority = (Goals.findOne(parentId) || {}).priority;
    this.priority.set(parentPriority || this.data.milestone.newGoalPriority());
  });
});

Template._goalsForm.helpers({
  'parents': function() {
    return this.milestone.parent() && this.milestone.parent().goals();
  },
  'priority': function() {
    return Template.instance().priority.get();
  }
});

Template._goalsForm.events({
  'click .js-save': function(e, t) {
    // TODO: Refactor validations and posting
    let $title = t.$('#title');
    let title = $title.val();

    let parentId = t.parentId.get();
    let progress = t.$('#progress').val();

    if (!title) return $title.parent('.form-group').addClass('has-error');
    if (!progress || progress < 0 || progress > 100) {
      return $('#progress').parent('.form-group').addClass('has-error');
    }

    let data = {
      'title': title,
      'priority': t.priority.get(),
      'parentId': parentId ? parentId : undefined,
      'milestoneId': this.milestone._id,
      'userId': Meteor.userId(),
      'completedPct': progress
    };

    if (this.goal._id) {
      Goals.update(this.goal._id, {'$set': data});
    } else {
      Goals.insert(data);
    }

    $('#formModal').modal('hide');
  },
  'change #parentId': function(e, t) {
    t.parentId.set(e.currentTarget.value);
  },
  'change #priority': function(e, t) {
    t.priority.set(Number(e.currentTarget.value));
  }
});
