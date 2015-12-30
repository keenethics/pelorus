Template.timeline.onCreated(function(){
  this.currentView = new ReactiveVar('week');
});

Template.timeline.helpers({
  strategicMilestone: function () {
    return Milestones.findOne({userId: Meteor.userId(), type: 'strategic'});
  },
  currentView: function(){
    return Template.instance().currentView.get();
  }
});

Template.timeline.events({
  'click .bar': function (e, t) {
    var newType = e.currentTarget.dataset.viewType;
    newType && t.currentView.set(newType);
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

