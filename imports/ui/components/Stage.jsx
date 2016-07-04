import React from 'react';

export default class StageUI extends React.Component {	
	handleClick(event) {
		console.log( event.target.classList)
		$('.panel').removeClass('panel-warning');
		this.refs.stage.className += ' panel-warning';
	}

	render() {	
		let classes = 'panel ' + this.props.stageType;
		console.log(this.props.stage.type)
		
		if ( this.props.stageType === 'week' ) {
			console.log('weeeek')
			classes += ' panel-warning'
		}

		if ( this.props.stage ) {
			return (
				<div className={classes} ref='stage' onClick={this.handleClick.bind(this)}>
					<p>{ this.props.stage.type }</p>
					{ this.props.stage.period }
				</div>
			)
		}
		else {
			return (
				<div className={classes} ref='stage' onClick={this.handleClick.bind(this)}>
					empty
				</div>
			)

		}
	}
}

