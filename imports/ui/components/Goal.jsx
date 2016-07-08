import React from 'react';
import ReactDOM from 'react-dom';
import ModalAddGoal from './ModalAddGoal.jsx';

export default class Goal extends React.Component {

	editGoal(e) {
		e.preventDefault();
    if (!Meteor.user()) return $('#logedAlert').modal('show');
    ReactDOM.render(<ModalAddGoal 
                      goal={ this.props.goal }
                      stage={ this.props.stage } 
                      parent={ this.props.stage.parent() && this.props.stage.parent().goals() }
                      error={ null } />, document.getElementById('modal-target'));
   	$('#modal').modal('show');	 
    
	}

	completedGoal(e) {
		e.preventDefault();
    if ( !Meteor.userId() ) return $('#logedAlert').modal('show');

    Meteor.call('toggleGoalCompletion', this.props.goal._id);
	}

	render() {
		return (
			<a href="#" className="list-group-item goal">
    		<div>
      		<input type="checkbox" className="js-goal-completed" checked={ this.props.goal.progress === 100 } 
      				onChange={ this.completedGoal.bind(this) }/>
    		</div>

    		<div className="goal-content"
    					onClick={ this.editGoal.bind(this) }>
      		{ this.props.goal.progress === 100 ?
        		<strike>{ this.props.goal.title }</strike>
      		:
        		this.props.goal.title 
      		}
          &nbsp;
      		({ this.props.goal.progress || 0 }%)
  		  </div>
  		</a>
		)
	}
}