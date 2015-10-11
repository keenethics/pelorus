Template._milestonesColumn.helpers({
  title: function() {
    if(!this.milestone) return `(${this.type})`;
    return this.milestone.title();
  }
});

Template._milestonesColumn.events({
  'click .js-add-milestone': function(e) {
    var data = { type: this.type }
    Blaze.renderWithData(Template._formModal, { title: 'Add Milestone', template: '_milestonesForm', data }, document.body);
  }
});

