import React from 'react';
import StagesUI from './StagesUI.jsx';
import StageUI from './Stage.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StagesWrapper extends React.Component {

  renderChildren( stage ) {
    let children = Stages.findOne().children(stage) || [];
    return ( <StagesUI 
                stages={ Stages.findOne().children(stage) } 
                stagesType={ Stages.relativeType(this.props.stagesType, 1) }
                activeStagesType={ this.props.activeStagesType } />
    );
	}

	handleClick(e) {
		e.stopPropagation();
		
		Session.set('activeStages', this.props.stagesType );
	}

	render() {
	  let week = ( this.props.stagesType === 'week' ),
	  		active = ( this.props.stagesType === this.props.activeStagesType );

	  return (
	    <div className={`stage ${ active? "active": ""} ${ this.props.stage? "": "dashed"}`} onClick={ this.handleClick.bind(this) }>	
		  	<StageUI stage={ this.props.stage } active={ active }/>
		  	{ week ?
			  	''
			  	:
				  <div className='substages'>
				    { this.renderChildren( this.props.stage ) }
				  </div>
				}
			</div>
	  );
	}
}