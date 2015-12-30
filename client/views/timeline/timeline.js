Template.timeline.onCreated(() => {
  this.currentView = new ReactiveVar('week');
});

Template.timeline.helpers({
  strategicMilestone: () => {
    return Milestones.findOne({userId: Meteor.userId(), type: 'strategic'});
  },
  currentView: () =>{
    return Template.instance().currentView.get();
  },
});

Template.timeline.events({
  'click .view-type': (e, t) => {
    let newType = e.currentTarget.dataset.viewType;
    newType && t.currentView.set(newType);
  },
});

Template.milestoneAlt.events({
  'click .js-add-goal': () => {
    let data = { milestone: this.milestone };
    Blaze.renderWithData(Template._formModal, {
      title: 'Add Goal',
      template: '_goalsForm',
      data,
    }, document.body);
  },
  'click .js-add-milestone': () => {
    let data = { type: this.milestone.childType };
    Blaze.renderWithData(Template._formModal, {
      title: 'Add Milestone',
      template: '_milestonesForm',
      data,
    }, document.body);
  },
});

Template.milestoneAlt.helpers({
  'getTitle': () => {
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
  'childType': () => {
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
