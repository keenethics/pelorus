Template.timeline.onCreated(function() {
  this.currentView = new ReactiveVar('week');
});

Template.timeline.helpers({
  'strategicMilestone': function() {
    return Milestones.findOne({'userId': Meteor.userId(), 'type': 'strategic'});
  },
  'currentView': function() {
    return Template.instance().currentView.get();
  },
});

Template.timeline.events({
  'click .view-type': function(e, t) {
    let newType = e.currentTarget.dataset.viewType;
    newType && t.currentView.set(newType);
  },
});

Template.milestoneAlt.events({
  'click .js-add-goal': function() {
    let data = { 'milestone': this.milestone };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Goal',
      'template': '_goalsForm',
      data,
    }, document.body);
  },
});

Template.milestoneAlt.helpers({
  'getTitle': function() {
    let milestone = this.milestone;
    if (milestone) {
      switch (milestone.type) {
      case 'strategic':
        return 'Strategic';
      case 'year':
        return milestone.period;
      case 'month':
        let monthNames = ['January', 'February',
          'March', 'April', 'May', 'June',
          'July', 'August', 'September',
          'October', 'November', 'December',
        ];
        let date = new Date(milestone.period);
        return monthNames[date.getMonth()];
      case 'week':
        return 'Week#' + moment(milestone.period, 'yyyy-ww').week();
      default:
        return '';
      }
    }
  },
  'childType': function() {
    if (this.milestone) {
      switch (this.milestone.type) {
      case 'strategic':
        return 'year';
      case 'year':
        return 'month';
      case 'month':
        return 'week';
      default:
        return '';
      }
    }
  },
});
