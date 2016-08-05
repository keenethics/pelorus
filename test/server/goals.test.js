import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Goals } from '/imports/api/goals/goals.js';
import { insertGoal } from '/imports/api/goals/methods/insert.js';
import faker from 'faker';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';

const langs = ["uk", "ru", "en" ];

describe('goals', function() {
  beforeEach(function () {
    resetDatabase();
  });
  describe('addGoal', function() {
    it('should add new goal', function() {
      const userId = Accounts.createUser({
        username: 'username',
        email : 'useremail@mail.com',
        password : "password",
        profile  : {
          language: langs[Math.round(Random.fraction()*2 )],
        },
      });
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
})