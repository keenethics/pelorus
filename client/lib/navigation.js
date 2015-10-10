  Template.navigation.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.route.getName() ? 'active' : '';
    }
  });