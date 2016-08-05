import React from 'react';
import I18n from 'meteor/timoruetten:react-i18n';

function ModalLoggedAlert() {
  return (
    <div className="modal fade" tabIndex="-1" role="dialog" id="loggedModal">
      <div className="modal-dialog">
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
              <I18n i18nkey="Welcome" />
            </h4>
          </div>
          <div className="modal-body">
            <I18n i18nkey="Log in or register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLoggedAlert;
