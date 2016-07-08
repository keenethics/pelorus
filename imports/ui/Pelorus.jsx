import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';	
import { Stages } from '/imports/api/stages/stages.js';
import { Goals } from '/imports/api/goals/goals.js';
import Navigation  from './components/Navigation.jsx';
import ModalLoggedAlert from './components/ModalLoggedAlert.jsx';
import StagesUI from './components/StagesUI.jsx';
import { GoTutorial } from '/imports/api/user_methods.js';

export default class Pelorus extends Component {	
	
	render() {
		return (
			<div className="container" style={{ 'marginTop': '10px' }}>
				<Navigation goTutorial={this.props.goTutorial}/>
				<StagesUI 
					stages={ Stages.find({type: 'years'}, {sort: {startsAt: -1}}).fetch() } 
					stagesType='years' 
					activeStagesType={ this.props.activeStagesType }/>
				
        <ModalLoggedAlert/>
      </div>
		);
  }
}

export default createContainer(() => {
  return {
  	goals: Goals.find().fetch(),
    stages: Stages.find().fetch(),
    goTutorial: GoTutorial,
  };
}, Pelorus);
