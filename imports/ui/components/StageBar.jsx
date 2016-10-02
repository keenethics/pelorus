import React, { PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import StageHeader from './StageHeader.jsx';

export default class StageBar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  classes() {
    return this.props.stage && this.props.stage.isCurrent() ? 'warning' : 'default';
  }

  handleClick(e) {
    e.stopPropagation();
    FlowRouter.go('pelorus', '', { activeStagesType: this.props.stageType });
  }

  renderComponent() {
    return (
      <div className={`panel panel-${this.classes()} bar`} onClick={this.handleClick}>
        <p className={`text-capitalize text-${this.classes()} vertical-text`}>
          <StageHeader stage={ this.props.stage } />
        </p>
      </div>
    );
  }

  render() { return this.renderComponent(); }
}

StageBar.propTypes = {
  stage: PropTypes.object,
  stageType: PropTypes.string,
};
