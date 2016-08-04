import faker from 'faker';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { Goals } from '/imports/api/goals/goals.js';
import { Stages } from '/imports/api/stages/stages.js';
import yaml from 'js-yaml';
import { _ } from 'meteor/underscore';
import { addStage } from '/imports/api/stages/methods.js';
import { Accounts } from 'meteor/accounts-base';
import { assert } from 'meteor/practicalmeteor:chai';

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
      let bounds = Stages.boundsFor(yearsStage.period, yearsStage.type, userLan);
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
      bounds = Stages.boundsFor(stage.period, stage.type, userLan);

      const copyGoals = true;
      const newStageId = addStage.run.call(
        { userId: userId },
        { stage, copyGoals }
      );

      const newGoal = Goals.findOne({ stageId: newStageId });
      const newStage = Stages.findOne({ _id: newStageId});
      
      assert.equal(newGoal.title, goal.title);
      assert.equal(newGoal.rank, goal.rank);
      assert.equal(newGoal.progress, goal.progress);
      assert.equal(newGoal.userId, userId);
      assert.equal(newGoal.stageId, newStageId);
      assert.equal(newGoal.parentId, goalId);

      assert.equal(newStage.period, stage.period);
      assert.equal(newStage.type, stage.type);
      assert.equal(newStage.userId, userId);
      assert.equal(newStage.startsAt.toString(), bounds.startsAt.toString());
      assert.equal(newStage.endsAt.toString(), bounds.endsAt.toString());
    });
  });
}); 
