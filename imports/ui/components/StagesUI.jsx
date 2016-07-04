import React from 'react';
import { Stages } from '/imports/api/stages/stages.js';
import StageUI from './Stage.jsx';

class StageWrapper extends React.Component {


	renderChildren( stage ) {	
		let children = Stages.findOne().children(stage) || [];
		return <StagesUI stages={ children } stagesType={ Stages.relativeType(this.props.stagesType, 1) } activeStages={ this.props.activeStages }/>;
	}

	render() {
		return (
			<div className='stage' onClick={ this.handleClick.bind(this) }>
				<StageUI stage={ this.props.stage } />
						
				<div className='substages'>
					{ this.renderChildren( this.props.stage ) }								
				</div>
			</div>
		)
	}
}

export default class StagesUI extends React.Component {	
	
	handleClick(e) {
		console.log(e.target)
		// Session.set('activeStages', this.props.stageType );
	}
	
	renderChildren( stage ) {	
		let children = Stages.findOne().children(stage) || [];
		return <StagesUI stages={ children } stagesType={ Stages.relativeType(this.props.stagesType, 1) } activeStages={ this.props.activeStages }/>;
	}

	renderComponent() {
		if ( this.props.stagesType === 'week' ) {

			return (
				<div>
					{ this.props.stages.length ? 
						this.props.stages.map( ( elem ) => (
							<div className='stage' key={ elem._id } onClick={this.handleClick.bind(this)}>
								<StageUI stage={ elem } />
							</div>
						))
					:
						<div className='stage' onClick={this.handleClick.bind(this)}>	
							<StageUI stage={ false } />
						</div>
					}
				</div>
			);
				
		}
		else {
			return (
				<div>
					{ this.props.stages.length ? 
						this.props.stages.map( ( elem ) => (
							<div className='stage' key={ elem._id } onClick={this.handleClick.bind(this)}>
								<StageUI stage={ elem } />
								
								<div className='substages'>
									{ this.renderChildren( elem ) }								
								</div>
							</div>
						))
					:
						<div className='stage' onClick={this.handleClick.bind(this)}>	
							<StageUI stage={ false }/>
							<div className='substages'>
								{ this.renderChildren( false ) }								
							</div>
						</div>
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
