import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import ModalAddStage from './ModalAddStage.jsx';
import ModalLoggedAlert from './ModalLoggedAlert.jsx';
import I18n from 'meteor/timoruetten:react-i18n';
import { Stages } from '/imports/api/stages/stages.js';



export default class Navigation extends Component {
  componentDidMount() {
    Blaze.render(Template._loginButtons,
	    	ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  componentWillUnmount() {
		Blaze.remove(this.view);
	}

	
  addStage() {
    if ( !Meteor.userId() ) {
      $('#loggedModal').modal('show');
    } else {
      render(<ModalAddStage
              error={null}
              stageType=''/>, document.getElementById('modal-target'));
      $('#addModal').modal('show');
    }
  }
  runTutorial(e) {
    this.props.goTutorial(e, this.refs.stage);
  }
  setLanguage(e) {
    const language = e.target.name;
    Session.set('language', e.target.name);
    if(Meteor.userId()) {
      Meteor.call('updateUserLanguage', language);
    }
  }
  render() {
    return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              				<span className="sr-only">Toggle navigation</span>
              				<span className="icon-bar"></span>
              				<span className="icon-bar"></span>
              				<span className="icon-bar"></span>
            			</button>
            			<a className="navbar-brand">Pelorus</a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
           				<ul className="nav navbar-nav">
              				<li>
                				<a ref='stage'
                					onClick={this.addStage.bind(this)}>
	                  				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            <I18n i18nkey="Add stage" />
                				</a>
              				</li>
            			</ul>
            			<ul className="nav navbar-nav navbar-right" ref='container'>
            				<li>
              				<a href="#"
              					onClick={this.runTutorial.bind(this)}>
                					<span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
              				</a>
            				</li>
            				<li>
              				<a href="https://github.com/keenethics/pelorus">
                					GitHub
              				</a>
            				</li>
            				<li className="dropdown">
              				<a href="#" className="dropdown-toggle"
              					data-toggle="dropdown" role="button" aria-expanded="false">
                					<span className="glyphicon glyphicon-globe" aria-hidden="true">
                					</span>
                					<span className="caret">
                					</span>
              				</a>
	                		<ul className="dropdown-menu" role="menu">
                  			<li>
                  				<a href="#" name="en" onClick={this.setLanguage.bind(this)}>
                  					English
                  				</a>
                  			</li>
                  			<li>
                  				<a href="#" name="ru" onClick={this.setLanguage.bind(this)}>
                  					Русский
                  				</a>
                  			</li>
                  			<li>
                  				<a href="#" name="uk" onClick={this.setLanguage.bind(this)}>
                  					Українська
                  				</a>
                  			</li>
		                	</ul>
              			</li>
            			</ul>
          			</div>
				</div>

			</nav>
		);
  }
}

Navigation.propTypes = {
  goTutorial: PropTypes.func.isRequired
};

