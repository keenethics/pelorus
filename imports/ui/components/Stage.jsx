import React from 'react';

export default class StageUI extends React.Component {	
	render() {	
		return (
			<div className='panel'>
				{ this.props.stage.period }				
			</div>
		)
	}
}