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
                      stage={ this.props.stage } 
                      error={ null }
                      parent={ this.props.stage.parent() && this.props.stage.parent().goals() } />,
        document.getElementById('modal-target'))
   	$('#addGoal').modal('show');	 
	}

  renderStageContent() {
    if ( !this.props.stage ) return (<div className={`panel panel-warning stage-content`}></div>)
    return (
      <div className={`panel panel-${this.props.stage.isCurrent()?'warning':'default'} stage-content`}>
        <div className="panel-heading text-capitalize">
          { this.props.stage.period }
          { this.props.stage.progress? this.props.stage.progress: '' }
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
 
	renderComponent() {
		if ( this.props.active ) return this.renderStageContent();
		let panelClass= 'default'
    if ( this.props.stage ) {  panelClass = ( this.props.stage.isCurrent()?'warning':'default' ) }
		
    return (
			<div className={`panel panel-${ panelClass } bar`}>
				<p className={`text-capitalize text-${ panelClass} vertical-text`}>
  					{ this.props.stage.period }
  					{ this.props.stage.progress? this.props.stage.progress: '' }
		  	</p>
			</div>				
		)
	}

	render() {
		return this.renderComponent();
	}
}
