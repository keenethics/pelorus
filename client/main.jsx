import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Pelorus from '/imports/ui/Pelorus';

Meteor.startup(() => {
  render(<Pelorus />, document.getElementById('render-target'));
});
