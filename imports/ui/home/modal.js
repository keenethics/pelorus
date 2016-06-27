import './modal.html';

Template.modal.onRendered(function() {
  this.$('#formModal').modal('show');
  this.$('#formModal').on('hidden.bs.modal', () => Blaze.remove(this.view));
});

Template.modal.helpers({
  data: function() {
    return this.data || {};
  }
});

Template.modal.show = data =>
  Blaze.renderWithData(Template.modal, data, document.body);

Template.modal.showLoginAlert = () =>
  Template.modal.show({template: '_loginAlert', title: 'Welcome'});