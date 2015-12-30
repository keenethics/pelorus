Template.milestonesIndex.onCreated(function(){
  this.activeType = (this.data || {}).activeType || new ReactiveVar('week');
});

Template.milestonesIndex.helpers({
  milestones: function () {
    let milestones = (Template.currentData() || {}).milestones;
    return milestones || Milestones.find({userId: Meteor.userId(), type: 'strategic'});
  },
  activeType: function(){
    return Template.instance().activeType;
  }
});

Template.milestonesIndex.events({
  'click .bar': function (e, t) {
    var newType = e.currentTarget.dataset.viewType;
    newType && t.activeType.set(newType);
  }
});
