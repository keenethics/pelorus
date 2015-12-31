Template._milestonesColumn.helpers({
  title: function() {
    if (!this.milestone) {
      return `(${this.type})`;
    }
    return this.milestone.title();
  }
});

Template._milestonesColumn.events({
  'click .js-add-milestone': function() {
    const data = {
      type: this.type
    };

    Blaze.renderWithData(Template._formModal, {
      title: 'Add Milestone',
      template: '_milestonesForm',
      data
    }, document.body);
  },

  'click .js-add-goal': function() {
    const data = {
      milestone: this.milestone
    };

    Blaze.renderWithData(Template._formModal, {
      title: 'Add Goal',
      template: '_goalsForm',
      data
    }, document.body);
  },

  'click .js-toggle-goal-completion': function(e) {
    const goal = Blaze.getData(e.currentTarget);

    Meteor.call('updateGoalCompletion', goal._id, !goal.completed);
  }
});
