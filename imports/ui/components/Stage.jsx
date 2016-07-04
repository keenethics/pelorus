import React from 'react';
import { setActiveStages } from '/imports/api/events.js';

export default class StageUI extends React.Component {	
	handleClick(event) {
		console.log( Session.get('activeStages'))
		Session.set('activeStages', this.props.stageType );
		console.log( Session.get('activeStages'))
		console.log(this.props)
		
	}

	render() {	
		console.log( Session.get('activeStages'))
		let classes = 'panel ' + this.props.stageType;

		// console.log(this.props.stage.type)
		// console.log(this.props.stageType)
		// console.log(this.props.activeStages)
		
		if ( this.props.stageType === this.props.activeStages ) {
			classes += ' panel-warning'
		}

		if ( this.props.stage ) {
			return (
				<div className={classes} ref='stage' onClick={this.handleClick.bind(this)}>
					<p>{ this.props.stage.type }</p>
					{ this.props.stage.period }
				</div>
			)
		}
		else {
			return (
				<div className={classes} ref='stage' onClick={this.handleClick.bind(this)}>
					empty
				</div>
			)

		}
	}
}



