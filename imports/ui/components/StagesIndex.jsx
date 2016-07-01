import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stages } from '/imports/api/stages/stages.js';


export default class StagesIndex extends Component {


    constructor(props) {
        super(props);
    }

	componentDidMount() {
		console.log(this);
	}
	render() {
		return (
			<div className='stage'>
				<div className='subsatges'>
				</div>
			</div>
		)
	}
}
