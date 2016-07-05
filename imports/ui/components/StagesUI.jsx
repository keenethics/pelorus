import React from 'react';
import StagesWrapper from './StagesWrapper.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StagesUI extends React.Component {
	renderComponent() {
		if ( this.props.stagesType === 'week' ) {
			if ( !this.props.stages.length ) {
				return <StagesWrapper
					stage={ false }
					stagesType={ this.props.stagesType }
					activeStagesType={ this.props.activeStagesType } />
			}

			return (
				<div>
					{ this.props.stages.length ?
						this.props.stages.map( ( elem ) => (
							<StagesWrapper
								stage={ elem }
								stagesType={ this.props.stagesType }
								activeStagesType={ this.props.activeStagesType }
								key={elem._id} />
						))
					:
						<StagesWrapper
							stage={ false }
							stagesType={ this.props.stagesType }
							activeStagesType={ this.props.activeStagesType } />
					}
				</div>
			);
		} else {
			if ( !this.props.stages.length ) {
				return <StagesWrapper
					stage={ false }
					stagesType={ this.props.stagesType }
					activeStagesType={ this.props.activeStagesType } />
			}

			return (
				<div>
					{ this.props.stages.length ?
						this.props.stages.map( ( elem ) => (
							<StagesWrapper
								stage={ elem }
								stagesType={ this.props.stagesType }
								activeStagesType={ this.props.activeStagesType }
								key={elem._id} />
						))
					:
						<StagesWrapper
								stage={ false }
								stagesType={ this.props.stagesType }
								activeStagesType={ this.props.activeStagesType } />
					}
				</div>
			)
		}
	}
  render() {
    if ( !Stages.findOne() )  return false;
    return this.renderComponent();
  }
}
