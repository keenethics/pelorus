import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends Component {

  
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


  renderModal( title, content ) {
    
    return (
      <div className="modal fade" tabindex="-1" role="dialog" id='modal'>
        <div className="modal-dialog">
          <div className="modal-content">
            
            <div className="modal-header">
              <button
                type="button" className="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"></span>
              </button>

              <h4 className="modal-title">{ title }</h4>
            </div>

            <div className="modal-body">
              { this.renderError() }
              { content }
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
