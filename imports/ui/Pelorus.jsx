import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Navigation  from './home/Navigation.jsx';
import Modal from './Modal.jsx';


export default class Pelorus extends Component {
	render() {
		return (
			<div className="container" style={{ 'marginTop': '10px' }}>
				<Navigation />
				<Modal />
			</div>
		);
	}
}
