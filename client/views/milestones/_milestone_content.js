Template._milestoneContent.events({
  'click .js-add-goal': function(e) {
    let data = { milestone: this.milestone };
    let renderData = { title: 'Add Goal', template: '_goalsForm', data };
    Blaze.renderWithData(Template._formModal, renderData, document.body);
  },
  'click .glyphicon-pencil': function(event) {
    let goalId = event.target.parentNode.parentNode.id;
    let data = { 'milestone': this.milestone, 'goalId': goalId };
    let renderData = { title: 'Edit Goal', template: '_editGoal', data };
    Blaze.renderWithData(Template._formModal, renderData, document.body);
  }
});
