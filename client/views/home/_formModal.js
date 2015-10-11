Template._formModal.onRendered(function() {
  this.$('#formModal').modal('show');
  this.$('#formModal').on('hidden.bs.modal', () => Blaze.remove(this.view));
});

