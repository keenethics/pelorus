import React, {Component} from 'react';

export default class ModalLoggedAlert extends Component {

  static show() {
    $('#loggedAlert').modal('show');
  }

  static hide() {
    $('#loggedAlert').modal('hide');
  }

  render() {
    return (
      <div class="modal fade" tabindex="-1" role="dialog" id='loggedAlert'>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
              <h4 class="modal-title">Welcome</h4>
            </div>
            <div class="modal-body">
              <p>Please, log in or register</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
