import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';

export default class ModalAddGoal extends React.Component {

	addGoal(e) {
		let stageId = this.props.stage._id;
    let data    = $(this.refs.form).serializeJSON();
    //TODO: use same handler in stages form
    let handler = (error) => {
      if (!error) return $('#addGoal').modal('hide');	
				ReactDOM.render(<ModalAddGoal 
													stage={ this.props.stage } 
													error={ error.reason } 
													goal={ this.props.goal }/>, 
										document.getElementById('modal-target'));
      	$(this.refs.form_group).removeClass('has-error');
      	JSON.parse(error.details).map( (elem) => {
     	  	$(`[name^=${elem.name}]`).parent('.form-group').addClass('has-error')
      	});
    };
  
    if ( this.props.goal ) {
      Meteor.call('updateGoal', this.props.goal._id, data, handler);
    } else {
    
      Meteor.call('insertGoal', _.extend({stageId}, data), handler);
    }
	}

	removeGoal(e) {
		e.preventDefault();
   		Meteor.call('removeGoal', this.goal._id);
    	$('#addGoal').modal('hide');
	}


	renderHeader() {
		return (
			<div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
        <h4 className="modal-title">
        	{ this.props.goal?  'Edit Goal' : 'Add Goal' }
        </h4>
      </div>
		)
	}

	renderError() {
		if ( this.props.error ) {
			return (
				<div className="alert alert-danger">
					<button
						type="button"
						className="close"
						aria-hidden="true">
						&times;
					</button>
					{ this.props.error }
				</div>)
		}
		else return null;
	}


	renderContent() {
		return (
			<div>
				<form ref='form'>
					<div className="form-group" ref='form_group'>
	        	<label for="title">Title</label>
	        	<input type="text" className="form-control" name="title"/>
	      	</div>

	      	<div className="form-group">
	        	<label for="title">Rank (#1 is goal you'd refuse last)</label>
	        	<input type="number" className="form-control" name="rank:number"/>
	      	</div>

	      	<div className="form-group">
	        	<label for="title">Progress</label>
	        	<input type="number" className="form-control" name="progress:number" id="progress" min="0" max="100"/>
	      	</div>

	      	{ this.props.stage.type !== 'years' ?

	      		<div className="form-group">
          		<label for="parentId">	Parent goal</label>
          		<select className="form-control" name="parentId">
            		<option value="">None</option>
		            	{ this.props.parent.map( (elem) => (
			            		<option value={ elem._id }>
	                			{ elem.title }
	              			</option>
		            		))
		            	}
          		</select>
        		</div>
        	: ''
        	}
				</form>
			  <div className="modal-footer">
			  	{	this.props.goal ?
			  		<button type="button" className="btn btn-danger js-remove-goal" title="Remove"
			  				onClick={ this.removeGoal.bind(this) }>
        			"Delete"
      			</button>
      			: ''
			  	}
			  	<button type="button" className="btn btn-primary js-save" 
			  			onClick={ this.addGoal.bind(this) }>
			  		Save
			  	</button>
		    </div>
			</div>
		)
	}

	
	
	render() {
		console.log(this.props)
		return  (
			 <div className="modal fade" tabindex="-1" role="dialog" id='addGoal'>
        <div className="modal-dialog">
          <div className="modal-content">
            { this.renderHeader() }
            <div className="modal-body">
            	{ this.renderError() }
              { this.renderContent() }
            </div>
          </div>
        </div>
      </div>          
		)
	}
}