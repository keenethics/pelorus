import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Template } from 'meteor/templating';
// import { Blaze } from 'meteor/blaze';



export default class Modal extends Component {

	render() {
		return (
			<div className="modal" id="formModal" tabindex="-1" role="dialog">
				dsdsd
    			<div className="modal-dialog" role="document">
      				<div className="modal-content">
        				<div className="modal-header">
          					<button type="button" className="close" 
          					data-dismiss="modal" 
          					aria-label="Close">
          						<span aria-hidden="true">&times;</span>
          					</button>
          					<h4 className="modal-title text-capitalize">TITLE</h4>
        				</div>
        				DATA
      				</div>
    			</div>
  			</div>
		)
	}
}