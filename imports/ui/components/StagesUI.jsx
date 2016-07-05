import React from 'react';
import { Stages } from '/imports/api/stages/stages.js';
import StageUI from './Stage.jsx';

class StageWrapper extends React.Component {

  renderChildren( stage ) {
    console.log(stage)
    let children = Stages.findOne().children(stage) || [];
    console.log('renderChildren')
    console.log(children)
    return <StagesUI 
                stages={ Stages.findOne().children(stage) } 
                stagesType={ Stages.relativeType(this.props.stagesType, 1) }
                activeStages={ this.props.activeStagesType }/>;
	}

	handleClick(e) {
		console.log(e.target)
		// Session.set('activeStages', this.props.stageType );
	}

	render() {
	  console.log('renderWraper')
	  console.log(this.props)
	  return (
	    <div className='stage'>	
		  <StageUI stage={ this.props.stage }/>
		  <div className='substages'>
		    { this.renderChildren( this.props.stage ) }
		  </div>
		</div>
	  );
	}
}

export default class StagesUI extends React.Component {	
	renderComponent() {

		console.log('renderCompnent')
		console.log(this.props)

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
			console.log('NONWeek')
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
		console.log('renderStages')
		console.log(this.props)	
		return this.renderComponent();
	}	
}
