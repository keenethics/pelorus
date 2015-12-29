Template._milestonesColumn.helpers({
  title: function() {
    if(!this.milestone) return `(${this.type})`;
    return this.milestone.title();
  }
});

Template._milestonesColumn.events({
  'click .js-add-milestone': function(e) {
    var data = { type: this.type }
    $('.modal').remove();
    Blaze.renderWithData(Template._formModal, { title: 'Add Milestone', template: '_milestonesForm', data }, document.body);
  },
  'click .js-add-goal': function(e) {
    var data = { milestone: this.milestone }
    $('.modal').remove();
    Blaze.renderWithData(Template._formModal, { title: 'Add Goal', template: '_goalsForm', data }, document.body);
  }
});

