import React from 'react';
import ReactDOM from 'react-dom';
import ModalAddGoal from './ModalAddGoal.jsx';
import { Stages } from '/imports/api/stages/stages.js';
import Goal from './Goal.jsx';

export default class StageUI extends React.Component {	
	addGoal(e) {
		e.preventDefault();
    if (!Meteor.user()) return $('#logedAlert').modal('show');
    ReactDOM.render(<ModalAddGoal 
                      goal = { false }
                      stage={ this.props.stage } 
                      error={ null }
                      parent={ this.props.stage.parent() && this.props.stage.parent().goals() } />,
        document.getElementById('modal-target'));
   	$('#modal').modal('show');	 
	}

  classes() {
    if ( !this.props.stage ) return 'default';
    return  this.props.stage.isCurrent() ?'warning' :'default';
  }
  
  renderHeader() {
    if ( this.props.stage ) {
      return (
        <span>
          { this.props.stage.title() + ' ' 
            + ( this.props.stage.progress()? '(' + this.props.stage.progress() + '%)': '' ) }
        </span>
      )
    }
  }

  renderStageContent() {
    if ( !this.props.stage ) return (<div className={`panel panel-${ this.classes() } stage-content`}></div>)
    return (
      <div className={`panel panel-${ this.classes() } stage-content`}>
        <div className="panel-heading text-capitalize">
          { this.renderHeader() }
        </div>

        <ul className='list-group'>
          { this.props.goals ? 
            this.props.goals.map( (elem) => (
              <Goal stage= { this.props.stage } goal = { elem }/>
            ))
          :'' }
        </ul>

        <div className="panel-body">
          <a href="#" className="btn btn-success pull-right js-add-goal" 
            onClick={ this.addGoal.bind(this) }>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </a>
        </div> 
      </div>
    )
  }
  
  renderBar() {
    return (
      <div className={`panel panel-${ this.classes() } bar`}>
        <p className={`text-capitalize text-${ this.classes() } vertical-text`}>
            { this.renderHeader() }
        </p>
      </div>        
    )
  }

	renderComponent() {
		if ( this.props.activeStagesType === this.props.stageType ) { 
      return this.renderStageContent(); 
    }
    else {
      return this.renderBar();    
    }
	}

	render() { return this.renderComponent() }
}
