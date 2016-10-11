import yaml from 'js-yaml';
import faker from 'faker';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { assert } from 'meteor/practicalmeteor:chai';
import { updateUserLanguage } from '/imports/api/user/updateUserLanguage.js';
import { Stages } from '/imports/api/stages/stages.js';
import { Mongo } from 'meteor/mongo';

const Goals = new Mongo.Collection('goalsTest');
const langs = ["uk", "ru", "en" ];

function loadingSeeds(seeds, user, parentId) {
  seeds.forEach(seed => {
    const userId = user._id;
    const bounds = Stages.boundsFor(seed.period, seed.type);
    const stageData = _.extend({ userId }, seed, bounds);
    const stageId = Stages.insert(stageData);
    const goalData = _.extend({ userId, stageId, parentId }, seed);
    const goalParentId = Goals.insert(goalData);

    if (seed.children) loadingSeeds(seed.children, user, goalParentId);
  });
}

describe('users', function (done) {
  beforeEach(function () {
    resetDatabase();
  });
  describe('updateUserLanguage', function() {
    it('should update user language', function() {
      const seeds = yaml.safeLoad(Assets.getText('intro_seeds.yml'), 'utf8').seeds;
      const userId = Accounts.createUser({
        username: 'username',
        email : 'useremail@mail.com',
        password : "password",
        profile  : {
          language: langs[Math.round(Random.fraction()*2 )],
        }
      });
      const newLang = langs[Math.round(Random.fraction()*2 )];
      const user = Meteor.users.findOne({ _id: userId });
      loadingSeeds(seeds, user);
      const stages = Stages.find({userId: userId}).fetch();

      updateUserLanguage.run.call(
        { userId: userId },
        { language: newLang },
      );

      stages.map(function(stage) {
        const updatedStage = Stages.findOne({ _id: stage._id });
        const testStage = Stages.boundsFor(stage.period, stage.type);
        assert.equal(updatedStage.startsAt.toString(), testStage.startsAt.toString());
        assert.equal(updatedStage.endsAt.toString(), testStage.endsAt.toString());
      });

      const updatedLan = Meteor.users.findOne({ _id: userId }).profile.language;
      assert.equal(updatedLan, newLang);
    });
  });
}); 
