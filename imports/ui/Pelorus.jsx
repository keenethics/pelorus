import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Navigation  from './components/Navigation.jsx';
import ModalLoggedAlert from './components/ModalLoggedAlert.jsx';
import ModalAddStage from './components/ModalAddStage.jsx';
import StagesUI from './components/StagesUI.jsx';
// import StagesIndex from './components/StagesIndex.jsx';


export default class Pelorus extends Component {
	render() {
		return (
			<div className="container" style={{ 'marginTop': '10px' }}>
				<Navigation />
				<ModalLoggedAlert/>
				<ModalAddStage/>
				<StagesUI />
			</div>
		);
	}
}
