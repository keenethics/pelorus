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
      const parentSeed = seeds[0];
      const parentBounds = Stages.boundsFor(parentSeed.period, parentSeed.type, userLan);
      const parentStage = _.extend(parentBounds, 
        { period: parentSeed.period, type: parentSeed.type },
        { userId: userId }
      );
      const parentStageId = Stages.insert(parentStage);
      const parentGoal = {
        title: parentSeed.title,
        rank: 0,
        progress: 0,
        stageId: parentStageId,
        userId: userId,
      };
      const parentGoalId = Goals.insert(parentGoal);

      const childSeed =  parentSeed.children[0];
      const childBounds = Stages.boundsFor(childSeed.period, childSeed.type, userLan);
      const childStage = {
        period: childSeed.period,
        type: childSeed.type,
      };
      const copyGoals = true;

      const newStageId = addStage.run.call(
        { userId: userId },
        { stage: childStage, copyGoals },
      );
      const newGoal = Goals.findOne({ stageId: newStageId });
      const newStage = Stages.findOne({ _id: newStageId});

      assert.equal(newGoal.title, parentGoal.title);
      assert.equal(newGoal.rank, parentGoal.rank);
      assert.equal(newGoal.progress, parentGoal.progress);
      assert.equal(newGoal.userId, userId);
      assert.equal(newGoal.stageId, newStageId);
      assert.equal(newGoal.parentId, parentGoalId);

      assert.equal(newStage.period, childStage.period);
      assert.equal(newStage.type, childStage.type);
      assert.equal(newStage.userId, userId);
      assert.equal(newStage.startsAt.toString(), childBounds.startsAt.toString());
      assert.equal(newStage.endsAt.toString(), childBounds.endsAt.toString());
    });
  });
}); 
