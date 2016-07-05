import React, { Component, PropTypes } from 'react';
import { GoTutorial } from '/imports/api/user_methods.js';
import {createContainer} from 'meteor/react-meteor-data';

import Navigation  from './components/Navigation.jsx';
import ModalLoggedAlert from './components/ModalLoggedAlert.jsx';
import ModalAddStage from './components/ModalAddStage.jsx';
import StagesUI from './components/StagesUI.jsx';


export default class Pelorus extends Component {
  render() {
    return (
			<div className="container" style={{ 'marginTop': '10px' }}>
				<Navigation goTutorial={this.props.goTutorial} />
				<ModalLoggedAlert/>
				<ModalAddStage/>
				<StagesUI />
			</div>
		);
  }
}


export default createContainer(() => {
  return {
    goTutorial: GoTutorial
  };
}, Pelorus);

Pelorus.propTypes = {
  GoTutorial: PropTypes.func.isRquired
};
