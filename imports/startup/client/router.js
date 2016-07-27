import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Pelorus from '/imports/ui/Pelorus';
import { render } from 'react-dom';

FlowRouter.route('/', {
  subscriptions: function () {
    this.register('Stages', Meteor.subscribe('Stages'));
  },
  name: 'pelorus',
  action(params, queryParams) {
    if (!queryParams.activeStagesType) { FlowRouter.go('/?activeStagesType=week'); }
    render(<Pelorus activeStagesType={ queryParams.activeStagesType } />,
      document.getElementById('render-target')
    );
  },
});
