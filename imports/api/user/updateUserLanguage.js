import { Stages } from '../stages/stages.js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { $ } from 'meteor/jquery';
import { introJs } from 'meteor/keenethics:introjs';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateUserLanguage = new ValidatedMethod({
  name: 'updateUserLanguage',
  validate({ language }) {
    check(language, String);
  },
  run({ language }) {
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }
    Meteor.users.update(this.userId, { $set: { 'profile.language': language } });
    Stages.find({ userId: this.userId }).forEach((stage) => {
      const bounds = Stages.boundsFor(stage.period, stage.type, language);
      Stages.update(stage._id, { $set: bounds });
    });
  },
});
