import faker from 'faker';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { Goals } from '/imports/api/goals/goals.js';
import { Stages } from '/imports/api/stages/stages.js';
import yaml from 'js-yaml';
import { _ } from 'meteor/underscore';
import { addStage } from '/imports/api/stages/methods.js';
import { Accounts } from 'meteor/accounts-base';

// const Stages = new Meteor.Collection('stages');
// const Goals = new Meteor.Collection('goalsTest')
const langs = ["uk", "ru", "en" ];

describe('stages', function (done) {
  beforeEach(function () {
    resetDatabase();
  });
  describe('addStage', function() {
    it('should add new stage', function() {
      const userId = Accounts.createUser({
        username: 'username',
        email : 'useremail@mail.com',
        password : "password",
        profile  : {
          language: langs[Math.round(Random.fraction()*2 )],
        }
      });
      const userLan = Meteor.users.findOne({ _id: userId }).profile.language;
      const seeds = yaml.safeLoad(Assets.getText('intro_seeds.yml'), 'utf8').seeds;
      const yearsStage = seeds[0];
      const bounds = Stages.boundsFor(yearsStage.period, yearsStage.type, userLan);
      let stage = _.extend( bounds, {period: yearsStage.period, type: yearsStage.type},
            {userId: userId});
      const stageId = Stages.insert(stage);
      const goal = {
        title: yearsStage.title,
        rank: 0,
        progress: 0,
        stageId: stageId,
        userId: userId
      }
      const goalId = Goals.insert(goal);
      const yearSeed =  yearsStage.children[0];
      stage = {
        period: yearSeed.period,
        type: yearSeed.type,
      }
      const copyGoals = true;
      

      const newStageId = addStage.run.call(
        { userId: userId },
        {
          stage, copyGoals
        }
      );
      console.log(Goals.find().fetch())
      console.log(Goals.findOne({ stageId: newStageId }));
      console.log(Stages.findOne({ _id: newStageId}));

    });
  });
}); 
