Template._milestoneLevel.events({
  'click .js-add-goal': function() {
    let data = { 'milestone': this.milestone };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Add Goal',
      'template': '_goalsForm',
      data }, document.body);
  },
  'click .glyphicon-pencil': function(event) {
    let goalId = event.target.parentNode.parentNode.id;
    let data = {
      'milestone': this.milestone,
      'goalId': goalId,
    };
    Blaze.renderWithData(Template._formModal, {
      'title': 'Edit Goal',
      'template': '_editGoal',
      data }, document.body);
  },
});
