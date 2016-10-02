import React, { PropTypes } from 'react';
import StageWrapper from './StageWrapper.jsx';

export default class StagesUI extends React.Component {
  renderComponent() {
    return (
      <div className="substages">
        { this.props.stages.map((elem) => (
          <StageWrapper
            stage={ elem }
            goals = { elem.goals() }
            stagesType={ this.props.stagesType }
            activeStagesType={ this.props.activeStagesType }
            key={ elem._id || 'stub' }
          />
        )) }
      </div>
    );
  }
  render() { return this.renderComponent(); }
}

StagesUI.propTypes = {
  stages: PropTypes.array,
  activeStagesType: PropTypes.string,
  stagesType: PropTypes.string,
};
