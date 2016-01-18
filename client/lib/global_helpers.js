let globalHelpers = {
  rank: () => {
    return Template.instance().rank.get();
  },
  periodTitle: () => {
    let type = Template.instance().selectedType.get();
    return type && s.capitalize(type);
  },
  periodInputType: () => {
    let type = Template.instance().selectedType.get();
    return type && type === 'year' ? 'number' : type;
  },
  type: () => {
    return Template.instance().selectedType.get();
  },
  firstYear: () => {
    return Template.instance().firstYear.get();
  },
  lastYear: () => {
    return Template.instance().lastYear.get();
  },
  error: () => {
    return Template.instance().error.get();
  }
};

_.each(globalHelpers, function(value, key) {
  Template.registerHelper(key, value);
});