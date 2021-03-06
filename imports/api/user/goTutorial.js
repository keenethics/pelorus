import { Stages } from '../stages/stages.js';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';
import { $ } from 'meteor/jquery';
import { introJs } from 'meteor/keenethics:introjs';

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
