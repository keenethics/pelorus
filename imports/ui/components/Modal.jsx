import React, {Component} from 'react';

export default class Modal extends Component {
  renderModal( title, content, id ) {
    return (
      <div className="modal fade" tabindex="-1" role="dialog" id={ id }>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
              <h4 className="modal-title">{ title }</h4>
            </div>
            <div className="modal-body">
              { content }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
