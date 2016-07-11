import React from 'react';
import StagesWrapper from'./StagesWrapper.jsx';

export default class StagesUI extends React.Component {	
	renderComponent() {
		if ( !this.props.stages.length ) { 
			return <StagesWrapper 
				stage={ false }  
				goals = { false }
				stagesType={ this.props.stagesType } 
				activeStagesType={ this.props.activeStagesType } />
		}
		return (
			<div className='stages-list'>
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
	render() { return this.renderComponent() }	
}
