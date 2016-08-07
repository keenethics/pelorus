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
      const user = Meteor.users.findOne({ _id: userId });
      const seeds = yaml.safeLoad(Assets.getText('intro_seeds.yml'), 'utf8').seeds;
      loadingSeeds(seeds, user);
    });
  });
}); 

function loadingSeeds(seeds, user) {
  seeds.forEach(seed => {
    const userId = user._id;
    const stage = {
      period: seed.period,
      type: seed.type,
    }
    const copyGoals = !!Math.round(Random.fraction());
    const newStageId = addStage.run.call(
        { userId: userId },
        { stage, copyGoals },
    );
    const newStage = Stages.findOne({ _id: newStageId }); 
    const goal = {
      title: seed.title,
      rank: 0,
      progress: 0,
      stageId: newStageId,
      userId: userId,
    };

    Goals.insert(goal);

    testNewStage(newStage, stage, user);

    testCopiedGoal(newStage, copyGoals);
    if (seed.children) loadingSeeds(seed.children, user);
  });
}

function testNewStage(newStage, stage, user) {
  const bounds = Stages.boundsFor(stage.period, stage.type, user.profile.language);
  
  assert.equal(newStage.period, stage.period);
  assert.equal(newStage.type, stage.type);
  assert.equal(newStage.userId, user._id);
  assert.equal(newStage.startsAt.toString(), bounds.startsAt.toString());
  assert.equal(newStage.endsAt.toString(), bounds.endsAt.toString());
};

function testCopiedGoal(newStage, copyGoals) {
  const copiedGoals = Goals.find({ stageId: newStage._id, parentId: {$exists: true} }).fetch();
  
  if (copyGoals && newStage.type !== 'years') {
    copiedGoals.forEach(goal => {
      const parentGoal = Goals.findOne(goal.parentId);
      const parentStage = newStage.parent();

      assert.equal(parentGoal.stageId, parentStage._id);

      assert.equal(goal.title, parentGoal.title);
      assert.equal(goal.rank, parentGoal.rank);
      assert.equal(goal.progress, parentGoal.progress);
      assert.equal(goal.userId, parentGoal.userId);
    });
    return false;
  };
  assert.equal(copiedGoals.length, 0);
};
