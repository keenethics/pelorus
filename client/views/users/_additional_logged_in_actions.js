Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-edit-profile': function(e) {
    e.preventDefault();
    Template.modal.show({
      title: 'Edit profile',
      template: '_userForm'
    });
  }
});
