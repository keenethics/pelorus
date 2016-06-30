import React, { Component } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
// import { Meteor } from 'meteor/meteor';
// import { Stages } from '/imports/api/stages/stages.js';
// Meteor.subscribe('Stages');

export default class StageUI extends Component {




	render() {
		
		console.log(this.props)
		return (
			<div>
			<div className='panel bar panel-{ this.props.stage.isCurrent? "warning": "default" }'>
				<p className=' text-capitalize  vertical-text { this.props.stage.isCurrent? "text-warning": "" }'>
					
      				{ this.props.stage.title }
			        { this.props.stage.progress ? this.props.stage.progress : '' }
    			</p>
			</div>

			<div className='panel panel-{ this.props.stage.isCurrent? "warning": "default" } stage-content'>
				{ this.props.stage._id ? 
					<div>
					 <div className="panel-heading text-capitalize">
        				title
        				{ this.props.stage.title }
        				{ this.props.stage.progress ? this.props.stage.progress: ''}
      				</div>

      				<ul className="list-group">
        				goalsList
      				</ul>

      				<div className='panel-boy'>
      					<a href="#" className="btn btn-success pull-right js-add-goal">
          					<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        				</a>
      				</div>
      				</div>
      			: ''


				}
			</div>
			</div>
		)
	} 
}


