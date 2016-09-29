import { Meteor } from 'meteor/meteor';
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Stages } from '/imports/api/stages/stages.js';
import I18n from 'meteor/timoruetten:react-i18n';
import { $ } from 'meteor/jquery';

export default class ModalAddStage extends Component {
  constructor(props) {
    super(props);
    this.insertStage = this.insertStage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $('#addModal').modal('show');
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.stageType !== '' || nextProps.error;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.stageType === 'years') {
      $('#type').val($('#type option:first').val());
    }
  }

  handleChange(e) {
    render(
      <ModalAddStage
        error={null}
        stageType={ e.target.options[e.target.selectedIndex].text }
      />,
      document.getElementById('modal-target')
    );
  }

  insertStage() {
    const data = $(this.refs.form).serializeJSON();
    const copyGoals = !!data.copyGoals;
    const period = data.period || `${data.firstYear}-${data.lastYear}`;
    const stage = { period, type: data.type };
    Meteor.call('stages.addStage', { stage, copyGoals }, (err) => {
      if (!err) return $('#addModal').modal('hide');
      render(
        <ModalAddStage
          error={ err.reason }
          stageType={ data.type }
        />,
        document.getElementById('modal-target')
      )
    })
  }

  renderError() {
    return (
      this.props.error ?
        <div className="alert alert-danger">
          <button
            type="button"
            className="close"
            aria-hidden="true"
          >
            &times;
          </button>
          <I18n i18nkey={ this.props.error } />
        </div>
      : null
    );
  }

  renderStageTypes() {
    return Stages.validTypes.map((elem, num) => (
      <option value={ elem } key = { num }>
        { elem }
      </option>
    ));
  }

  renderInputForm() {
    return this.props.stageType === 'years' || this.props.stageType === '' ?
    <div className="form-group">
      <label className="control-label">
      <I18n i18nkey="First year" />
    </label>
      <input
        type="year"
        required
        className="form-control"
        name="firstYear"
        min="2000"
      />

      <label className="control-label">
        <I18n i18nkey="Last year" />
      </label>
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
        <I18n i18nkey={ this.props.stageType } />
        </label>
        <input
          type={ this.props.stageType }
          required
          className="form-control"
          name="period"
        />
        <span className="help-block period-err-msg">
          { this.props.error }
        </span>
        <label>
          <input
            type="checkbox"
            name="copyGoals"
          />
          <I18n i18nkey="Copy goals from parent stage" />
        </label>
    </div>;
  }

  render() {
    return (
    <div className="modal fade" role="dialog" id="addModal" 
        data-keyboard="false" data-backdrop="static">
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
            <h4 className="modal-title">
              <I18n i18nkey="Add stage" />
            </h4>
          </div>
        { this.renderError() }
          <form ref="form">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="type">
                  <I18n i18nkey="Type of stage" />
                </label>
                <select className="form-control" name="type" id="type"
                  onChange={this.handleChange}
                >
                  { this.renderStageTypes() }
                </select>
              </div>
              { this.renderInputForm() }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                // data-dismiss="modal"
                onClick = {this.insertStage}
              >
              <I18n i18nkey="Add" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

ModalAddStage.propTypes = {
  stageType: PropTypes.string.isRequired,
  error: PropTypes.string,
};
