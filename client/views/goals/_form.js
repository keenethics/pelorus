Template._goalsForm.onCreated(function() {
  this.priority = new ReactiveVar(this.data.goal && this.data.goal.priority);
  this.parent = new ReactiveVar();
});

Template._goalsForm.onRendered(function() {
  this.autorun(()=>{
    let parentId = this.parent.get();
    let priority = 0;
    let anotherGoal;
    if (parentId) {
      anotherGoal = Goals.findOne(parentId);
      if (anotherGoal && anotherGoal.priority) {
        priority =  anotherGoal.priority;
      }
    } else {
      anotherGoal = Goals.findOne(
        {'milestoneId': this.data.milestone._id},
        {'sort': {'priority': -1}});
      if (anotherGoal && !Number.isNaN(anotherGoal.priority)) {
        priority = anotherGoal.priority + 1;
      }
    }
    this.priority.set(priority);
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
    let parentId = t.parent.get();

    if (!title) return $title.parent('.form-group').addClass('has-error');

    let data = {
      'title': title,
      'priority': t.priority.get(),
      'parentId': parentId ? parentId : undefined,
      'milestoneId': this.milestone._id,
      'userId': Meteor.userId()
    };

    if (this.goal._id) {
      Goals.update(this.goal._id, {'$set': data});
    } else {
      Goals.insert(data);
    }

    $('#formModal').modal('hide');
  },
  'change #parentId': function(e, t) {
    t.parent.set(e.currentTarget.value);
  },
  'change #priority': function(e, t) {
    t.priority.set(Number(e.currentTarget.value));
  }
});

