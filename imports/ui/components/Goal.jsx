import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import ModalAddGoal from './ModalAddGoal.jsx';
import { $ } from 'meteor/jquery';
import { toggleGoalCompletion } from '/imports/api/goals/methods/toggleGoalCompletion.js';

export default class Goal extends React.Component {
  constructor() {
    super();
    this.completedGoal = this.completedGoal.bind(this);
    this.editGoal = this.editGoal.bind(this);
  }

  editGoal(e) {
    e.preventDefault();
    if (!Meteor.user()) return $('#logedAlert').modal('show');
    ReactDOM.render(
      <ModalAddGoal
        goal={ this.props.goal }
        stage={ this.props.stage }
        parent={ this.props.stage.parent() && this.props.stage.parent().goals() }
        error={ null }
      />,
      document.getElementById('modal-target')
    );
    $('#modal').modal('show');
  }

  completedGoal(e) {
    e.preventDefault();
    if (!Meteor.userId()) { return $('#logedAlert').modal('show'); }
    toggleGoalCompletion.call({ goalId: this.props.goal._id });
  }

  render() {
    return (
      <a href="#" className="list-group-item goal">
        <div>
          <input type="checkbox" className="js-goal-completed"
            checked={this.props.goal.progress === 100}
            onChange={this.completedGoal}
          />
        </div>

        <div className="goal-content"
          onClick={this.editGoal}
        >
          { this.props.goal.progress === 100 ?
            <strike>{ this.props.goal.title }</strike>
          :
            this.props.goal.title
          }
          &nbsp;
          ({ this.props.goal.progress || 0 }%)
        </div>
      </a>
    );
  }
}

Goal.propTypes = {
  goal: PropTypes.object.isRequired,
  stage: PropTypes.object.isRequired,
};
