import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Goals } from '/imports/api/goals/goals.js';
import faker from 'faker';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import { insertGoal } from '/imports/api/goals/methods/insert.js';
import { removeGoal } from '/imports/api/goals/methods/remove.js';
import { updateGoal } from '/imports/api/goals/methods/update.js';
import { toggleGoalCompletion } from '/imports/api/goals/methods/toggleGoalCompletion.js';

const langs = ["uk", "ru", "en" ];
const userId = Accounts.createUser({
  username: 'username',
  email : 'useremail@mail.com',
  password : "password",
  profile  : {
    language: langs[Math.round(Random.fraction()*2 )],
  },
});

Factory.define('goals', Goals, {
  title: faker.name.title(),
  rank: Math.round(Random.fraction()*10),
  progress: Math.round(Random.fraction()*100),
  stageId: Random.id(),
  parentId: Random.id(),
});

describe('goals', function() {
  beforeEach(function () {
    resetDatabase();
  });
  describe('addGoal', function() {
    it('should add new goal', function() {
      const goalData = {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        stageId: Random.id(),
        parentId: Random.id(),
      };
      const newGoalId = insertGoal.run.call(
        { userId: userId },
        { goalData },
      );
      const newGoal = Goals.findOne({ _id: newGoalId });
      
      assert.equal(goalData.title, newGoal.title);
      assert.equal(goalData.rank, newGoal.rank);
      assert.equal(goalData.progress, newGoal.progress);
      assert.equal(goalData.stageId, newGoal.stageId);
      assert.equal(goalData.parentId, newGoal.parentId);
      assert.equal(userId, newGoal.userId);
    });
  });
  describe('updateGoal', function() {
    it('should be update goal', function() {
      Factory.create('goals', {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        stageId: Random.id(),
        parentId: Random.id(),
        userId: userId,
      });

      const goalId = Goals.findOne({})._id;
      const newData = {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        parentId: Random.id(),
      };

      updateGoal.run.call(
        { userId: userId },
        {
          goalId: goalId,
          data: newData
        }
      );

      const updatedGoal = Goals.findOne();

      assert.equal(newData.title, updatedGoal.title);
      assert.equal(newData.rank, updatedGoal.rank);
      assert.equal(newData.progress, updatedGoal.progress);
      assert.equal(newData.parentId, updatedGoal.parentId);
    });
  })
  describe('toggleGoalCompletion', function() {
    it('should change goal progress status', function() {
      Factory.create('goals', {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        stageId: Random.id(),
        parentId: Random.id(),
        userId: userId,
      });
      const goal = Goals.findOne();

      toggleGoalCompletion.run.call(
        { userId: userId },
        { goalId: goal._id }
      );
      
      const updatedGoal = Goals.findOne();

      if (goal.progress !== 100) {
        assert.equal(updatedGoal.progress, 100);
      }
      else {
        assert.equal(updatedGoal.progress, 0);
      };
    });
  });
  describe('removeGoal', function() {
    it('should remove goal without children', function() {
      Factory.create('goals', {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        stageId: Random.id(),
        parentId: Random.id(),
        userId: userId,
      });
      const goalData = Goals.findOne();
      removeGoal.run.call(
        { userId: userId },
        { goalData }
      );

      assert.equal(Goals.find().count(), 0);
    });
    it('should not remove goal with children', function() {
      Factory.create('goals', {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        stageId: Random.id(),
        parentId: Random.id(),
        userId: userId,
      });

      const goalData = Goals.findOne();

      Factory.create('goals', {
        title: faker.name.title(),
        rank: Math.round(Random.fraction()*10),
        progress: Math.round(Random.fraction()*100),
        stageId: Random.id(),
        parentId: goalData._id,
        userId: userId,
      });
      let err;
      try {
        removeGoal.run.call(
          { userId: userId },
          { goalData }
        );
      } catch (e) {
        err = e.reason;
      }
      assert.equal(err, 'Goal can\'t be removed');
    })
  });

})