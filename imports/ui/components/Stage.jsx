import React from 'react';
import ReactDOM from 'react-dom';

import { setActiveStages } from '/imports/api/events.js';

export default class StageUI extends React.Component {	
	// handleClick(e) {
	// 	Session.set('activeStages', this.props.stageType );
	// }

	render() {	
	
		// let classes;
		// let active = ( this.props.stageType === this.props.activeStages );
		
		// if ( active ) {
		// 	classes = 'panel active'
		// }
		// else {
		// 	classes = 'panel'
		// }


		return (
			<div>
				
				{ this.props.stage ?
												
					<p>{ this.props.stage.period }</p>
					
				:
					<p>empty</p>
				}
			</div>
		)
		// return (
		// 	<div className={classes} onClick={this.handleClick.bind(this)}>
				
		// 		{ this.props.stage ?
		// 			active ? 
		// 				<div className='panel-heading text-capitalize'>
		// 					{ this.props.stage.period }
		// 				</div>
		// 			:	
		// 				<p className='text-capitalize vertical-text'>{ this.props.stage.period }</p>
					
		// 		:
		// 			<p>empty</p>
		// 		}
		// 	</div>
		// )
	}
}



