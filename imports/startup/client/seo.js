import './constants.js';
// import { SEO } from 'meteor/manuelschoebel:ms-seo';


SEO.config({
  title: Meteor.App.NAME,
  meta: {
    'description': Meteor.App.DESCRIPTION
  }
});
