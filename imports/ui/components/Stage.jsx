import React from 'react';
import ReactDOM from 'react-dom';

import { setActiveStages } from '/imports/api/events.js';

export default class Stage extends React.Component {

	render() {
		return (
			<div>
				{ this.props.active ?
					<div className={`panel panel-default stage-content`}>
			      		<div className="panel-heading text-capitalize">
			        		{ this.props.stage.period }
			        		{ this.props.stage.progress? this.props.stage.progress: '' }
			      		</div>

								<ul className='list-goal'>
			      			<li>
			      				Goal
			      			</li>
			      		</ul>
			      		<div className="panel-body">
			        		<a href="#" className="btn btn-success pull-right js-add-goal">
			          		<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
			        		</a>
			  			</div>
			      	</div>
				:
					<div className='panel panel-default bar'>
	    				<p className='text-capitalize text-warning vertical-text'>
	      					{ this.props.stage.period }
	      					{ this.props.stage.progress? this.props.stage.progress: '' }
					  	</p>
	  				</div>
  				}
	  		</div>
		);
	}
}
