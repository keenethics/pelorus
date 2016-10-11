import { Stages } from '../stages/stages.js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Match } from 'meteor/check';

export const updateUserLanguage = new ValidatedMethod({
  name: 'updateUserLanguage',
  validate({ language }) {
    check(language, Match.Optional(String));
  },
  run({ language }) {
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }
    Meteor.users.update(this.userId, { $set: { 'profile.language': language } });
    Stages.find({ userId: this.userId }).forEach((stage) => {
      const bounds = Stages.boundsFor(stage.period, stage.type);
      Stages.update(stage._id, { $set: bounds });
    });
  },
});
