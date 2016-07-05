import React from 'react';
import ReactDOM from 'react-dom';

import { setActiveStages } from '/imports/api/events.js';

export default class StageUI extends React.Component {	
	
	render() {
		console.log('Stage')	
		console.log(this.props)
		return (

			<div>
				{ this.props.stage ?
												
					<p>{ this.props.stage.period }</p>
					
				:
					<p>empty</p>
				}
			</div>
		)
	}
}



