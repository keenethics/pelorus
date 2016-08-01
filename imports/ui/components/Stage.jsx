import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ModalAddGoal from './ModalAddGoal.jsx';
import Goal from './Goal.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

export default class StageUI extends React.Component {
  constructor() {
    super();
    this.addGoal = this.addGoal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addGoal(e) {
    e.preventDefault();
    if (!Meteor.user()) return $('#loggedModal').modal('show');
    ReactDOM.render(
      <ModalAddGoal
        goal={ false }
        stage={ this.props.stage }
        error={ null }
        parent={ this.props.stage.parent() && this.props.stage.parent().goals() }
      />,
      document.getElementById('modal-target')
    );
    $('#modal').modal('show');
  }

  classes() {
    if (!Object.keys(this.props.stage).length) return 'default';
    return this.props.stage.isCurrent() ? 'warning' : 'default';
  }

  handleClick(e) {
    e.stopPropagation();
    FlowRouter.go('pelorus', '', { activeStagesType: this.props.stageType });
  }

  renderStageContent() {
    if (!Object.keys(this.props.stage).length) {
      return (<div className={`panel panel-${this.classes()} stage-content`}></div>);
    }
    return (
      <div className={`panel panel-${this.classes()} stage-content`}>
        <div className="panel-heading text-capitalize">
          { this.renderHeader() }
        </div>
        <ul className="list-group">
          { this.props.goals ?
            this.props.goals.map((elem) => (
              <Goal stage= { this.props.stage } goal = { elem } key={elem._id} />
            ))
            : ''
          }
        </ul>
        <div className="panel-body">
          <a href="#" className="btn btn-success pull-right js-add-goal"
            onClick={this.addGoal}
          >
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    );
  }

  renderHeader() {
    if (Object.keys(this.props.stage).length) {
      return (
        <span>
          { this.props.stage.title() }
          { this.props.stage.progress() ? ` (${this.props.stage.progress()}%)` : '' }
        </span>
      );
    }
  }

  renderBar() {
    return (
      <div className={`panel panel-${this.classes()} bar`} onClick={this.handleClick}>
        <p className={`text-capitalize text-${this.classes()} vertical-text`}>
            { this.renderHeader() }
        </p>
      </div>
    );
  }

  renderComponent() {
    if (this.props.activeStagesType === this.props.stageType) {
      return this.renderStageContent();
    }
    return this.renderBar();
  }

  render() { return this.renderComponent(); }
}

StageUI.propTypes = {
  stage: PropTypes.object,
  goals: PropTypes.array,
  stageType: PropTypes.string,
  activeStagesType: PropTypes.string,
};
