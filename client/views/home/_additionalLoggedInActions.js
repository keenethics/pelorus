Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-edit-profile': function(e) {
    e.preventDefault();
    Template._formModal.show({
      title: 'Edit profile',
      template: '_formUserProfile',
      data: {}
    });
  }
});
