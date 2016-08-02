import { Stages } from '../stages/stages.js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { $ } from 'meteor/jquery';
import { introJs } from 'meteor/keenethics:introjs';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
export const updateUserLanguage = new ValidatedMethod({
  name: 'updateUserLanguage',
  validate({ locale }) {
    check(locale, String);
  },
  run({ locale }) {
    console.log('methods');
    console.log(locale);
    console.log(this.userId);
    console.log( Meteor.users.findOne({ _id: this.userId }));
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }
    Meteor.users.update(this.userId, { $set: { 'profile.language': locale } });
    console.log( Meteor.users.findOne({ _id: this.userId }));
  },
});

// Stages.find({ userId: this.userId }).forEach((stage) => {
//   console.log(stage)
//   const bounds = Stages.boundsFor(stage.period, stage.type, locale);
//   console.log(bounds)
//   Stages.update(stage._id, { $set: bounds });
//   console.log(Stages.findOne({ _id: stage._id }))
// });
