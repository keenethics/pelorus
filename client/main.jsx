import '/imports/startup/client';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'

import Pelorus from '/imports/ui/Pelorus';


FlowRouter.route( '/', {
	subscriptions:  function() {
  		this.register('Stages', Meteor.subscribe('Stages') );
  	},
  	name: 'pelorus',
  	action() {
    	ReactLayout.render( Pelorus );
  	}
});
//if
//ready  	

