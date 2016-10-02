import React, { PropTypes } from 'react';
import StagesUI from './StagesUI.jsx';
import StageContent from './StageContent.jsx';
import StageBar from './StageBar.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StageWrapper extends React.Component {
  classes() {
    const classes = ['stage'];
    if (this.props.stagesType === this.props.activeStagesType) classes.push('active');
    if (!this.props.stage) classes.push('dashed');
    return classes.join(' ');
  }

  render() {
    return (
      <div className={ this.classes() }>
        <StageContent stage={ this.props.stage } goals={ this.props.goals } />
        <StageBar stage={ this.props.stage } stageType={ this.props.stagesType } />

        <StagesUI
          stages={ this.props.stage.children() }
          stagesType={ Stages.relativeType(this.props.stagesType, 1) }
          activeStagesType={ this.props.activeStagesType }
        />
      </div>
    );
  }
}

StageWrapper.propTypes = {
  stagesType: PropTypes.string,
  activeStagesType: PropTypes.string,
  stage: PropTypes.object || PropTypes.bool,
  goals: PropTypes.array,
};
