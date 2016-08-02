import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';
import { Random } from 'meteor/random';
import { updateUserLanguage } from '/imports/api/user/updateUserLanguage.js';
import { Accounts } from 'meteor/accounts-base';

const langs = ["uk", "ru", "en" ];

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
      const newLang = langs[Math.round(Random.fraction()*2 )];

      console.log(Meteor.users.findOne({ _id: userId }));
      console.log(newLang);

      updateUserLanguage.run.call(
        { userId: userId },
        { locale: newLang }
      );
      console.log('test')
      console.log(Meteor.users.findOne({ _id: userId }));
    });
  });
}); 