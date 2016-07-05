import React from 'react';
import { Stages } from '/imports/api/stages/stages.js';
import StageUI from './Stage.jsx';

class StageWrapper extends React.Component {

  renderChildren( stage ) {
    let children = Stages.findOne().children(stage) || [];
    return <StagesUI 
                stages={ Stages.findOne().children(stage) } 
                stagesType={ Stages.relativeType(this.props.stagesType, 1) }
                activeStagesType={ this.props.activeStagesType }/>;
	}

	handleClick(e) {
		console.log(e.target)
		// Session.set('activeStages', this.props.stageType );
	}

	render() {
	  let week = ( this.props.stagesType === 'week' );
	  return (
	    <div className='stage'>	
		  <StageUI stage={ this.props.stage }/>
		  { week?
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

export default class StagesUI extends React.Component {	
	renderComponent() {
		if ( this.props.stagesType === 'week' ) {
			console.log('week')
			return (
				<div>
					{ this.props.stages.length ? 
						this.props.stages.map( ( elem ) => (
							<StageWrapper 
								stage={ elem }  
								stagesType={ this.props.stagesType } 
								activeStagesType={ this.props.activeStagesType }
								key={elem._id} />
						))
					:
						<StageWrapper 
							stage={ false }  
							stagesType={ this.props.stagesType } 
							activeStagesType={ this.props.activeStagesType } />
					}
				</div>
			);
				
		}
		else {
			return (
				<div>
					{ this.props.stages.length ? 
						this.props.stages.map( ( elem ) => (
							<StageWrapper 
								stage={ elem }  
								stagesType={ this.props.stagesType } 
								activeStagesType={ this.props.activeStagesType }
								key={elem._id} />
						))
					:
						<StageWrapper 
								stage={ false }  
								stagesType={ this.props.stagesType } 
								activeStagesType={ this.props.activeStagesType } />
					}
				</div>
			);
		}
	}

	render() {
		if ( !Stages.findOne() )  return false
		return this.renderComponent();
	}	
}
