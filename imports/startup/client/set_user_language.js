import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Tracker } from 'meteor/tracker';
import { moment } from 'meteor/momentjs:moment';
import { accountsUIBootstrap3 } from 'meteor/ian:accounts-ui-bootstrap-3';

Meteor.startup(() => {
  Tracker.autorun(() => {
    if (((Meteor.user() || {}).profile || {}).language) {
      const language = Meteor.user().profile.language;
      TAPi18n.setLanguage(language);
      moment.locale(language);
      accountsUIBootstrap3.setLanguage(language);
    }
  });
});
