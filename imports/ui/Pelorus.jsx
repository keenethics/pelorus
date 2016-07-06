import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';	
import { Stages } from '/imports/api/stages/stages.js';
import Navigation  from './components/Navigation.jsx';
import ModalLoggedAlert from './components/ModalLoggedAlert.jsx';
import StagesUI from './components/StagesUI.jsx';

export default class Pelorus extends Component {
	
	componentWillMount() {
		Session.set( 'activeStages','week');
        
	}

	render() {

        
		return (
			<div className="container" style={{ 'marginTop': '10px' }}>
				<Navigation />
				<StagesUI 
					stages={this.props.stages} 
					stagesType='years' 
					activeStagesType={ this.props.activeStagesType }/>	
                <ModalLoggedAlert/>
			</div>
		);
	}
}


export default createContainer(() => {
	return { 
		stages: Stages.find({type: 'years'}, {sort: {startsAt: -1}}).fetch(),
		activeStagesType: Session.get('activeStages'),
  }
}, Pelorus);