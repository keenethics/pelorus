	import React, { Component } from 'react';
import Modal from './Modal.jsx';

export default class ModalLoggedAlert extends Modal {
  render() {
    return this.renderModal(
                  'Welcome', 
                  'Please, log in or register',
                  'logedAlert' );
  }
}
