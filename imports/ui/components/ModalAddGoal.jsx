import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';
import I18n from 'meteor/timoruetten:react-i18n';

export default class ModalAddGoal extends Modal {
  shouldComponentUpdate(nextProps) {
    $('.has-error').removeClass('has-error');
    if (!nextProps.error) { this.refs.title.value = nextProps.goal.title || ''; }
    if (this.refs.select) { this.refs.select.value = nextProps.goal.parentId || ''; }
    this.refs.rank.value = nextProps.goal.rank || '';
    this.refs.progress.value = nextProps.goal.progress || 0;
    return true;
  }

  addGoal() {
    const stageId = this.props.stage._id;
    const data = $(this.refs.form).serializeJSON();

    const handler = (error) => {
      if (!error) return $('#modal').modal('hide');
      ReactDOM.render(
        <ModalAddGoal
          goal={ this.props.goal }
          stage={ this.props.stage }
          error={ error.reason }
          parent={ this.props.stage.parent() && this.props.stage.parent().goals() }
        />,
        document.getElementById('modal-target')
      );

      $(this.refs.form_group).removeClass('has-error');
      JSON.parse(error.details).map((elem) => {
        $(`[name^=${elem.name}]`).parent('.form-group').addClass('has-error');
      });
    };

    if (this.props.goal) {
      Meteor.call('updateGoal', this.props.goal._id, data, handler);
    } else {
      Meteor.call('insertGoal', _.extend({ stageId }, data), handler);
    }
  }

  removeGoal(e) {
    e.preventDefault();
    Meteor.call('removeGoal', this.props.goal._id);
    $('#modal').modal('hide');
  }

  renderComponent() {
    const title = (this.props.stage ? <I18n i18nkey="Edit Goal" />: <I18n i18nkey="Add Goal" />);
    const content = (
      <div>
        <form ref="form">
          <div className="form-group" ref="form_group">
            <label for="title"><I18n i18nkey="Title" /></label>
            <input type="text" className="form-control" ref="title"
              defaultValue={ this.props.goal.title || '' } name="title" ref="title" autofocus
            />
          </div>
          <div className="form-group">
            <label for="title"><I18n i18nkey="Rank (#1 is goal you'd refuse last)" /></label>
            <input type="number" className="form-control" name="rank:number" ref="rank"
              defaultValue = { this.props.goal.rank || ''}
            />
          </div>
          <div className="form-group">
            <label for="title"><I18n i18nkey="Progress" /></label>
            <input type="number" className="form-control" name="progress:number"
              id="progress" min="0" max="100" ref="progress"
              defaultValue={ this.props.goal.progress || 0 }
            />
          </div>
          { this.props.stage.type !== 'years' ?
            <div className="form-group">
              <label for="parentId"><I18n i18nkey="Parent goal" /></label>
              <select className="form-control" name="parentId" value={ this.props.goal.parentId }
                ref="select"
              >
                <option value="">None</option>
                { this.props.parent.map((elem) => (
                  <option value={ elem._id }
                    key={ elem._id }
                  >
                    { elem.title }
                  </option>))
                }
              </select>
            </div>
            : ''
          }
        </form>
        <div className="modal-footer">
          { this.props.goal ?
            <button type="button" className="btn btn-danger" title="Remove"
              onClick={ this.removeGoal.bind(this) }
            >
              <I18n i18nkey="Delete" />
            </button>
            : ''
          }
          <button type="button" className="btn btn-primary"
            onClick={ this.addGoal.bind(this) }
          >
            <I18n i18nkey="Save" />
          </button>
        </div>
      </div>
    );
    return this.renderModal(title, content);
  }
  render() { return this.renderComponent(); }
}
