import React from 'react';
import ReactDOM from 'react-dom';
import ModalAddGoal from './ModalAddGoal.jsx';

export default class Goal extends React.Component {

	editGoal(e) {
		e.preventDefault();
    if (!Meteor.user()) return $('#logedAlert').modal('show');

    ReactDOM.render(<ModalAddGoal stage={ this.props.stage } error={ null } goal={ this.props.goal }/>, document.getElementById('modal-target'));
   	$('#addGoal').modal('show');	 
    
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
      				onClick={ this.completedGoal.bind(this) }/>
    		</div>

    		<div className="goal-content js-edit-goal"
    					onClick={ this.editGoal.bind(this) }>
      		{ this.props.goal.progress === 100 ?
        		<strike>{ this.props.goal.title }</strike>
      		:
        		this.props.goal.title  
      		}
      		({ this.props.goal.progress || 0 }%)
  		  </div>
  		</a>
		)
	}
}