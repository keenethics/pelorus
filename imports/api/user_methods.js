import { Stages } from './stages/stages.js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import $ from 'meteor/jquery';
import { introJs } from 'meteor/keenethics:introjs';

Meteor.methods({
  updateUserLanguage(locale) {
    check(locale, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    Meteor.users.update(this.userId, { $set: { 'profile.language': locale } });
    Stages.find({ userId: this.userId }).forEach((stage) => {
      const bounds = Stages.boundsFor(stage.period, stage.type, locale);
      Stages.update(stage._id, { $set: bounds });
    });
  },
});

export function GoTutorial(e, stage) {
  e.preventDefault();
  const steps = [
    { intro: TAPi18n.__('Pelorus is') },
    {
      intro: TAPi18n.__('Stage is a goals period'),
      element: stage,
    },
    {
      intro: TAPi18n.__('Create goals'),
      element: $('.active > .stage-content .js-add-goal').get(0),
    },
    {
      intro: TAPi18n.__('Switch views'),
      element: $('.stage:not(.active) > .bar').get(0),
    },
    {
      intro: TAPi18n.__('Edit goal'),
      element: $('.active > .stage-content .goal').get(0),
    },
  ];
  introJs().setOptions({ showStepNumbers: false, steps }).start();
}
