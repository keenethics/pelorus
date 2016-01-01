Template._formModal.onRendered(function() {
  this.$('#formModal').modal('show');
  this.$('#formModal').on('hidden.bs.modal', () => Blaze.remove(this.view));
});

Template._formModal.show = data =>
  Blaze.renderWithData(Template._formModal, data, document.body);

