Template._milestone.events({
  'click .js-add-goal': function(e) {
    e.preventDefault();
    Template._formModal.show({
      'title': 'Add Goal',
      'template': '_goalsForm',
      'data': { 'milestone': this.milestone, 'goal': {} }
    });
  },
  'click .bar': function() {
    this.activeType.set(this.milestone.type);
  }
});
