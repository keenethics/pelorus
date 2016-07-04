import React from 'react';
import { Stages } from '/imports/api/stages/stages.js';
import StageUI from './Stage.jsx';


export default class StagesUI extends React.Component {	
	
	
	renderRecursive( stage, nextType ) {	
		let children = [];
		if ( stage ) {
			children = Stages.findOne().children(stage);
		}
		return React.createElement( StagesUI, { 
									stages: children,  
									stagesType: nextType, 
									activeStages: this.props.activeStages,
								});
	}
	
	render() {
		let nextType = Stages.relativeType(this.props.stagesType, 1);
		
		
		if ( !Stages.findOne() )  return false

		if ( this.props.stagesType === 'week' ) {
			if ( this.props.stages.length ) {
				return (
					<div>
						{ 
							this.props.stages.map( ( elem ) => (
								<div className='stage' key={ elem._id }>
									<StageUI stage={ elem } stageType={ this.props.stagesType } activeStages={this.props.activeStages }/>
								</div>
							))
						}
					</div>
				);
			} 
			else {
				return (
					<div>
						<div className='stage'>	
							<StageUI stage={ false } stageType={ this.props.stagesType } activeStages={this.props.activeStages }/>
						</div>
					</div>
				);
			}	
		}
		else {
			if ( this.props.stages.length ) {
				return (
					<div>
						{
							this.props.stages.map( ( elem ) => (
								<div className='stage' key={ elem._id }>
									<StageUI stage={ elem } stageType={ this.props.stagesType } activeStages={this.props.activeStages }/>
									
									<div className='substages'>
										{ this.renderRecursive(elem, nextType) }								
									</div>
								</div>
							))
						}
					</div>
				);
			}
			else {
				return (
					<div className='stage'>	
						<StageUI stage={ false } stageType={ this.props.stagesType } activeStages={this.props.activeStages }/>
						<div className='substages'>
							{ this.renderRecursive(false, nextType) }								
						</div>
					</div>
				);
			} 
		}
	}	
}
