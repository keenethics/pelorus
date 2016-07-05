import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Modal from './Modal.jsx';
import { Stages } from '/imports/api/stages/stages.js';


export default class ModalLoggedAlert extends Modal {
	constructor(props) {
		super(props);

	  this.state = {
	      selectedTypeYears: true,
	      selectedType: 'years',
	      periodInputtype: 'number',
	      error: false
	  };
}

  handleChange(event) {
		this.setState( { selectedType: event.target.value } )
		if ( event.target.value === 'year' ) {
			this.setState( { periodInputtype: 'number' } );
		}
		else {
			this.setState( { periodInputtype:  event.target.value } );
		}

		if ( event.target.value !== 'years' ) {
			return this.setState( { selectedTypeYears:  false } );
		}

		this.setState( { selectedTypeYears:  true } );
  }

  insertStage(e) {

  	const data = $(this.refs.form).serializeJSON();
  	const period = data.period || `${data.firstYear}-${data.lastYear}`;
  	const stage = {period, type: data.type};

  	Meteor.call('addStage', stage, !!data.copyGoals, (err) => {
   		if (!err) return $('#addStage').modal('hide')
    			this.setState( { error: err.reason } );
   //  		//ToDo: needs refactoring
   //  		if (err.error === 'period-invalid') {
   //    		return tpl.$('#period').parent('.form-group').addClass('has-error');
   //  		}
  	});


  }

	render() {
	    let title = 'Add stage',
	       	content =
						<div>
							{ this.state.error ?
								<div className="alert alert-danger">
			        				<button type="button" className="close js-error-close" aria-hidden="true">&times;</button>
			        				{ this.state.error }
			      				</div>
							: ''
  				}
	        	<form ref='form'>
	        		<div className="form-group">
	        			<label for="type"> Type of stage </label>
	        			<select className="form-control" id="type" name="type"
	        				onChange={this.handleChange.bind(this)}>
	          				{ this.props.stageValidTypes.map( (elem) => (
	          					<option value={ elem }>
		          					{ elem }
		          				</option>
	          					))
	          				}
	        			</select>
	      			</div>

	      			{ this.state.selectedTypeYears ?
	      					<div>
	      					<div className="form-group">
          						<label className="control-label" for="firstYear">First year</label>
          						<input type="year" required className="form-control" id="firstYear" name="firstYear" min="2000" />
        					</div>
        					<div className="form-group">
          						<label className="control-label" for="lastYear">Last year</label>
          						<input type="year" required className="form-control" id="lastYear" name="lastYear" min="2000"  />
       						</div>
       						</div>
	      				:
	      					<div>
	      					<div className="form-group">
	          					<label className="control-label text-capitalize" for="period">
		            				{ this.state.selectedType }
	          					</label>
	          					 <input type={ this.state.periodInputtype } required className="form-control" id="period" name="period" min="2000"/>
	          					<span className="help-block period-err-msg">{ this.state.error }</span>
	        				</div>
					        <div className="checkbox">
					          <label>
					            <input type="checkbox" name="copyGoals"/> Copy goals from parent stage
					          </label>
					        </div>
					        </div>
	      			}
	        	</form>

	        	<div className="modal-footer">
	    			<button type="button" className="btn btn-primary js-insert-stage"
	    			onClick = {this.insertStage.bind(this)}>
	      				Add
	   				</button>
				</div>
				</div>;

    	return this.renderModal(title, content, 'addStage')
    }
}

export default createContainer(() => {
  const currentYear = moment().year();
  return {
    stageValidTypes: Stages.validTypes,
    selectedType: new ReactiveVar(Stages.ValidTypes || 'week'),
    firstYear: new ReactiveVar(currentYear),
    lastYear: new ReactiveVar(currentYear + 5),
    error: new ReactiveVar(null)
  };
}, ModalLoggedAlert);
