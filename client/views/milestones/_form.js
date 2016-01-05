Template._milestonesForm.onCreated(function() {
  this.selectedType = new ReactiveVar(this.data.type || 'week');
});

Template._milestonesForm.helpers({
  parents: function() {
    let type = Template.instance().selectedType.get();
    return type && Milestones.find({
      type: Milestones.relativeType(type, -1),
      userId: Meteor.userId() });
  },
  periodTitle: function() {
    let type = Template.instance().selectedType.get();
    return type && s.capitalize(type);
  },
  periodInputType: function() {
    let type = Template.instance().selectedType.get();
    return type && type === 'year' ? 'number' : type;
  },
  type: function() {
    return Template.instance().selectedType.get();
  },
  types: function() {
    return Milestones.validTypes;
  }
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, tpl) {
    const formData = tpl.$('form').serializeJSON();
    const milestoneData = _.omit(formData, ['copyGoals']);
    const $modal = $('#formModal');

    Meteor.call('addMilestone', milestoneData, function(err, _id) {
      // TODO: Find out what to do with error (notification, dom, etc.)
      if (err) {
        console.log(err);
      } else if (_id) {
        if (formData.copyGoals) {
          Meteor.call('copyMilestoneGoals', milestoneData.parentId, _id);
        }
      }

      // TODO: Should we hide modal if it's error?
      $modal.modal('hide');
      $modal.remove();
    });
  },
  'change #type': function(e, t) {
    let type = e.currentTarget.value;
    if (type) {
      t.selectedType.set(type);
    }
  }
});
