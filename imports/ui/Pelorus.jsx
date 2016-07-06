import { createContainer } from 'meteor/react-meteor-data';	
import { Stages } from '/imports/api/stages/stages.js';
import Navigation  from './components/Navigation.jsx';
import ModalLoggedAlert from './components/ModalLoggedAlert.jsx';
import React, { Component, PropTypes } from 'react';
import { GoTutorial } from '/imports/api/user_methods.js';
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
    goTutorial: GoTutorial,
    stages: Stages.find({type: 'years'}, {sort: {startsAt: -1}}).fetch(),
    activeStagesType: Session.get('activeStages')
  };
}, Pelorus);

// Pelorus.propTypes = {
//   GoTutorial: PropTypes.func.isRquired
// };
