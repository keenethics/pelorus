import React from 'react';
import StagesWrapper from'./StagesWrapper.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StagesUI extends React.Component {	
	renderComponent() {
		if ( this.props.stagesType === 'week' ) {
			if ( !this.props.stages.length ) {
				return <StagesWrapper 
					stage={ false } 
					goals = { null } 
					stagesType={ this.props.stagesType } 
					activeStagesType={ this.props.activeStagesType } />
			}
	
			return (
				<div>
					{ this.props.stages.map( ( elem ) => (
						<StagesWrapper 
							stage={ elem } 
							goals = { elem.goals() }
							stagesType={ this.props.stagesType } 
							activeStagesType={ this.props.activeStagesType } 
							key={elem._id} />
					)) }
				</div>
			)
		}
		else {
			if ( !this.props.stages.length ) { 
				return <StagesWrapper 
					stage={ false }  
					goals = { null }
					stagesType={ this.props.stagesType } 
					activeStagesType={ this.props.activeStagesType } />
			}
			
			return (
				<div>
					{ this.props.stages.map( ( elem ) => (
						<StagesWrapper 
							stage={ elem }
							goals = { elem.goals() }
							stagesType={ this.props.stagesType } 
							activeStagesType={ this.props.activeStagesType }
							key={ elem._id } />
					)) }
				</div>
			)
		}
	}	


	render() {
		if ( !Stages.findOne() )  return false
		return this.renderComponent();
	}	
}