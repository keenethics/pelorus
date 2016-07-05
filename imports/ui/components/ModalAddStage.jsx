import React from 'react';
import { render } from 'react-dom';
import { Stages } from '/imports/api/stages/stages.js';


export default class ModalAddStage extends React.Component {
	componentDidMount() {
		$('#addModal').modal('show');
	}
  componentWillUpdate(nextProps) {
    if(nextProps.stageType === 'years') {
      $('#type').val($('#type option:first').val());
    }
  }
  handleChange(e) {
		render(<ModalAddStage
            error={null}
            stageType={ e.target.options[e.target.selectedIndex].text } />,
          document.getElementById('render-modal'));
  }

  insertStage(e) {
	 //
  // 	const data = $(this.refs.form).serializeJSON();
  // 	const period = data.period || `${data.firstYear}-${data.lastYear}`;
  // 	const stage = {period, type: data.type};
	 //
  // 	Meteor.call('addStage', stage, !!data.copyGoals, (err) => {
  //  		if (!err) return $('#addStage').modal('hide')
  //   			this.setState( { error: err.reason } );
  //  //  		//ToDo: needs refactoring
  //  //  		if (err.error === 'period-invalid') {
  //  //    		return tpl.$('#period').parent('.form-group').addClass('has-error');
  //  //  		}
  // 	});
  }

  renderError() {
    return this.props.error ?
			<div className="alert alert-danger">
				<button
					type="button"
					className="close"
					aria-hidden="true"
				>
					&times;
				</button>
				{ this.props.error }
			</div> : null;
  }

  renderStageTypes() {
    return Stages.validTypes.map(elem =>
			<option value={ elem }>
				{ elem }
			</option>
		);
  }

  renderInputForm() {
    return this.props.stageType === 'years' ?
			<div className="form-group">
			  <label className="control-label">First year</label>
		    <input
					type="year"
					required
					className="form-control"
					name="firstYear"
					min="2000"
				/>

		    <label className="control-label">Last year</label>
		    <input
					type="year"
					required
					className="form-control"
					name="lastYear"
					min="2000"
				/>
			</div> :
			<div className="form-group">
					<label className="control-label text-capitalize">
						{ this.props.stageType }
					</label>
					 <input
					 	type={ this.props.stageType }
						required
						className="form-control"
						name="period"
					/>
					<span
					 className="help-block period-err-msg">
					 	{ this.props.error }
					</span>
					<label>
						<input
						 type="checkbox"
						 name="copyGoals"
						/> Copy goals from parent stage
					</label>
			</div>;
  }

  render() {
    return (
			<div className="modal fade" role="dialog" id='addModal'>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Add Stage</h4>
						</div>
					{ this.renderError() }
						<form>
							<div className="modal-body">
								<div className="form-group">
									<label for="type"> Type of stage </label>
									<select className="form-control" name="type" id='type'
										onChange={this.handleChange.bind(this)}>
											{ this.renderStageTypes() }
									</select>
								</div>
								{ this.renderInputForm() }
							</div>
							<div className="modal-footer">
								<button
									type="submit"
									className="btn btn-primary js-insert-stage"
									data-dismiss="modal"
									onClick = {this.insertStage.bind(this)}
								> Add </button>
							</div>
						</form>
					</div>
				</div>
			</div>
	    );
    // return this.renderModal(title, content, 'addStage');
  }
}

ModalAddStage.propTypes = {
  error: React.PropTypes.string.isRequired,
  stageType: React.PropTypes.string.isRequired
};
