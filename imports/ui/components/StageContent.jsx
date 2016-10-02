import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ModalAddGoal from './ModalAddGoal.jsx';
import Goal from './Goal.jsx';
import { $ } from 'meteor/jquery';
import StageHeader from './StageHeader.jsx';

export default class StageContent extends React.Component {
  constructor() {
    super();
    this.addGoal = this.addGoal.bind(this);
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
    return this.props.stage && this.props.stage.isCurrent() ? 'warning' : 'default';
  }

  renderComponent() {
    if (!Object.keys(this.props.stage).length) {
      return (<div className={`panel panel-${this.classes()} stage-content`}></div>);
    }
    return (
      <div className={`panel panel-${this.classes()} stage-content`}>
        <div className="panel-heading text-capitalize">
          <StageHeader stage={ this.props.stage } />
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

  render() { return this.renderComponent(); }
}

StageContent.propTypes = {
  stage: PropTypes.object,
  goals: PropTypes.array,
};
