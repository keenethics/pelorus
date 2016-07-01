import { Stages } from './stages/stages.js';

Meteor.methods({
  updateUserLanguage: function(locale) {
    check(locale, String);
    if (!this.userId) {
      throw new Meteor.Error('forbidden-action', 'User should be logged in');
    }

    Meteor.users.update(this.userId, { $set: { 'profile.language': locale } });
    Stages.find({ userId: this.userId }).forEach(function(stage) {
      let bounds = Stages.boundsFor(stage.period, stage.type, locale);
      Stages.update(stage._id, { $set: bounds });
    });
  }
});

export function GoTutorial(e, stage) {
  e.preventDefault();
  let steps = [
    { intro: TAPi18n.__('Pelorus is') },
    {
      intro: TAPi18n.__('Stage is a goals period'),
      element: stage
    },
    {
      intro: TAPi18n.__('Create goals'),
      element: $('.active > .stage-content .js-add-goal').get(0)
    },
    {
      intro: TAPi18n.__('Switch views'),
      element: $('.stage:not(.active) > .bar').get(0)
    },
    {
      intro: TAPi18n.__('Edit goal'),
      element: $('.active > .stage-content .goal').get(0)
    }
  ];
  introJs().setOptions({showStepNumbers: false, steps}).start();
}
