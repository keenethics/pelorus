import React from 'react';
import { Stages } from '/imports/api/stages/stages.js';
import StageUI from './Stage.jsx';


export default class StagesUI extends React.Component {	
	renderRecursive(stage) {
		let children = Stages.findOne().children(stage);
		if ( children.length ) {
			return React.createElement(StagesUI, { stages: children } );
		}
	}
	
	render() {
		return (
			<div>
			{
				this.props.stages.map( (elem) => (		
						<div className={`stage active ${ elem._id ? '': 'dashed' } `} key={ elem._id }>
							
							<StageUI stage={ elem }/>

							<div className='substages active'>
								{ this.renderRecursive(elem) }								
							</div>
						</div> 
				))
			}
			</div>		
		)
	} 
}
