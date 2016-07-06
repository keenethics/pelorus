import React from 'react';
import StagesUI from './StagesUI.jsx';
import Stage from './Stage.jsx';
import StageUI from './Stage.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StagesWrapper extends React.Component {

  renderChildren( stage ) {    
    if ( this.props.stagesType === 'week' ) return false
  	let children = ( this.props.stage? this.props.stage.children(): [] );
    return ( <StagesUI 
                stages={ children }
                stagesType={ Stages.relativeType(this.props.stagesType, 1) }
                activeStagesType={ this.props.activeStagesType } />
    );
	}

	handleClick(e) {
		e.stopPropagation();
		Session.set('activeStages', this.props.stagesType );
	}

	render() {  
	  let active = ( this.props.stagesType === this.props.activeStagesType );
	  return (
	    <div className={`stage ${ active? "active": ""} ${ this.props.stage? "": "dashed"}`} 
						onClick={ this.handleClick.bind(this) }>	
		  	<StageUI stage={ this.props.stage } goals = { this.props.goals } active={ active }/>
		  	
			  <div className='substages'>
			    { this.renderChildren( this.props.stage ) }
			  </div>
			</div>
	  );
	}
}

