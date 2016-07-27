import React from 'react';
import StagesUI from './StagesUI.jsx';
import StageUI from './Stage.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StagesWrapper extends React.Component {
  classes() {
    const classes = ['stage'];
    if (this.props.stagesType === this.props.activeStagesType) classes.push('active');
    if (!this.props.stage) classes.push('dashed');
    return classes.join(' ');
  }

  renderChildren(stage) {
    if (this.props.stagesType === 'week') return false;
    let children = this.props.stage ? this.props.stage.children() : [];
    return (
      <StagesUI
        stages={ children }
        stagesType={ Stages.relativeType(this.props.stagesType, 1) }
        activeStagesType={ this.props.activeStagesType }
      />
    );
  }

  render() {
    return (
      <div className={ this.classes() }>
        <StageUI
          stage={ this.props.stage }
          goals = { this.props.goals }
          stageType = { this.props.stagesType }
          activeStagesType={ this.props.activeStagesType }
        />
          <div className="substages">
            { this.renderChildren(this.props.stage) }
          </div>
      </div>
    );
  }
}
