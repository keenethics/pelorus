import './_navigation.html';
import './modal.js';
import '../stages/_form.js';
import '../users/_login_alert.html';

Template.navigation.events({
  'click .js-add-stage': function() {
    Template.modal.show({title: 'Add stage', template: '_stagesForm'});
  }
});
