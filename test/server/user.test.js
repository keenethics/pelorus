import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import yaml from 'js-yaml';
import { updateUserLanguage } from '/imports/api/user/updateUserLanguage.js';
import { assert, expect, should } from 'meteor/practicalmeteor:chai';
import { Stages } from '/imports/api/stages/stages.js';

const Goals = new Mongo.Collection('goalsTest');
// const Stages = new Mongo.Collection('stagesTest');
const langs = ["uk", "ru", "en" ];

function loadingSeeds(seeds, userID, parentId) {
  seeds.forEach(seed => {
    const userId = userID;
    const bounds = Stages.boundsFor(seed.period, seed.type);
    const stageData = _.extend({ userId }, seed, bounds);
    const stageId = Stages.insert(stageData);
    const goalData = _.extend({ userId, stageId, parentId }, seed);
    const goalParentId = Goals.insert(goalData);

    if (seed.children) loadingSeeds(seed.children, userId, goalParentId);
  });
}

describe('users', function (done) {
  beforeEach(function () {
    resetDatabase();
  });
  describe('updateUserLanguage', function() {
    it('should update user language', function() {
      const userId = Accounts.createUser({
        username: 'username',
        email : 'useremail@mail.com',
        password : "password",
        profile  : {
          language: langs[Math.round(Random.fraction()*2 )],
        }
      });
      
      console.log('goals = ' + Goals.find().count())
      console.log('stages = ' + Stages.find().count())
      
      const seeds = yaml.safeLoad(Assets.getText('intro_seeds.yml'), 'utf8').seeds;
      
      console.log('seeds = ' + seeds)
      console.log(userId)
      loadingSeeds(seeds, userId);
      
      console.log('already')
      console.log('users stages = ' + Stages.find({userId: userId}).count() )
      console.log('goals = ' +  Goals.find().count())
      console.log( Stages.findOne())

      const newLang = langs[Math.round(Random.fraction()*2 )];
      updateUserLanguage.run.call(
        { userId: userId },
        { locale: newLang }
      );
      // const retrieved = Meteor.users.findOne({ _id: userId }).profile.language;
      // assert.equal(retrieved, newLang);
    });
  });
}); 