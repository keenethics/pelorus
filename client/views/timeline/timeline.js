Template.timeline.onCreated(function(){
  this.activeType = new ReactiveVar('week');
});

Template.timeline.helpers({
  strategicMilestone: function () {
    return Milestones.findOne({userId: Meteor.userId(), type: 'strategic'});
  },
  activeType: function(){
    return Template.instance().activeType.get();
  }
});

Template.timeline.events({
  'click .bar': function (e, t) {
    var newType = e.currentTarget.dataset.viewType;
    newType && t.activeType.set(newType);
  }
});

Template.milestoneAlt.events({
  'click .js-add-goal': function(e) {
    var data = { milestone: this.milestone }
    Blaze.renderWithData(Template._formModal, { title: 'Add Goal', template: '_goalsForm', data }, document.body);
  },
  'click .glyphicon-pencil': function(event) {
    let goalId = event.target.parentNode.parentNode.id;
    let data = {
      milestone: this.milestone,
      goalId: goalId,
    };
    Blaze.renderWithData(Template._formModal, {
      title: 'Edit Goal',
      template: '_editGoal',
      data
    }, document.body);
  },
});

