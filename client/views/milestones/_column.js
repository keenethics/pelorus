Template._milestonesColumn.helpers({
  title: function() {
    return this.milestone && this.milestone.title || `(${this.type})`
  }
});

