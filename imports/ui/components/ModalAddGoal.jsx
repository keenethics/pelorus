import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';

export default class ModalAddGoal extends Modal {

	constructor(props) {
        super(props);
        this.state = {
            title: this.props.goal.title || '',
            progress: this.props.goal.progress || 0,
            rank: this.props.goal.rank || 0,
        };
    }
    componentDidMount() {
    	this.setGoalInfo()
    }
 	componentDidlUpdate() {
    	console.log('ssss')
    	this.setGoalInfo();
    	return true;
    }
    setGoalInfo() {
    	if ( this.props.goal ) {
    		$(this.refs.title).val( this.props.goal.title );
    		$(this.refs.progress).val( this.props.goal.progress );
    		$(this.refs.rank).val( this.props.goal.rank );	
    	}
    }
	addGoal(e) {
		let stageId = this.props.stage._id,
	    	data    = $(this.refs.form).serializeJSON();

	    let handler = (error) => {
	      if (!error) return $('#addGoal').modal('hide');	
				ReactDOM.render(<ModalAddGoal 
								goal={ this.props.goal }
								stage={ this.props.stage } 
								error={ error.reason } 
								parent={ this.props.stage.parent() && this.props.stage.parent().goals() }/>, 
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
	// value={ this.props.goal.title }
				        		   // onChange = { this.onFieldChange.bind(this, 'title') }
	renderComponent() {
		let title = ( this.props.stage? 'Edit Goal': 'Add Goal' ),
			content = (
				<div>
					<form ref='form'>

						<div className="form-group" ref='form_group'>
				        	<label for="title">Title</label>
				        	<input type="text" className="form-control" 
				        		   name="title" ref='title'/>
		      			</div>

				      	<div className="form-group">
				        	<label for="title">Rank (#1 is goal you'd refuse last)</label>
				        	<input type="number" className="form-control" name="rank:number" ref='rank'/>
				      	</div>

				      	<div className="form-group">
				        	<label for="title">Progress</label>
				        	<input type="number" className="form-control" name="progress:number" 
        						   id="progress" min="0" max="100" ref='progress'/>
				      	</div>

				      	{ this.props.stage.type !== 'years' ?

				      		<div className="form-group">
			          		<label for="parentId">	Parent goal</label>
			          		<select className="form-control" name="parentId" defaultValue={this.props.goal.parentId}>
			            		<option value="">None</option>
					            	{ this.props.parent.map( (elem) => (
						            	<option value={ elem._id } 
						            			selected={ elem._id === this.props.goal.parentId }>
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
					  		<button type="button" className="btn btn-danger" title="Remove"
					  				onClick={ this.removeGoal.bind(this) }>
		        				"Delete"
		      				</button>
		      			: ''
					  	}
					  	<button type="button" className="btn btn-primary" 
					  			onClick={ this.addGoal.bind(this) }>
					  		Save
					  	</button>
			    	</div>
				</div>
			);

		return this.renderModal( title, content );
	}
	
	render() { return this.renderComponent() }
}