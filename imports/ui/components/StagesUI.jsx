import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Stages } from '/imports/api/stages/stages.js';
import StageUI from './Stage.jsx';
Meteor.subscribe('Stages');

export default class StagesUI extends Component {


	constructor(props) {
        super(props);
 
        this.state = {
            stages: Stages.find({}).fetch(),
        };
    }


	render() {
		
		console.log(this.props.stages)
		return (
			<div>

				{ this.props.stages.map( (elem) => (
					<div className={`stage ${ elem._id ? " " : "dashed" }`}  key={elem._id}>
						stages
						<StageUI stage={elem}/>
						<div className='substages'>

						</div>
					</div>
				)) }
			</div>
			
			
		)
	} 
}


export default createContainer(() => {
	
	console.log( Stages.find({}).__proto__.goals() )
	return { stages: Stages.find({type: 'years'}, {sort: {startsAt: -1}}).fetch() 
		// stages: function() {
  //   		let stage = this.parentStage;
  //   		console.log(stage)
  //   		if (!stage) return Stages.find({type: 'years'}, {sort: {startsAt: -1}});
    
  //   		let type = Stages.relativeType(stage.type, 1);
  //   		console.log(type)
  //   		if (!type) return [];

  //   		let children = stage.children();
  //   		console.log(children)
  //   		return children.count() > 0 ? children : [Stages._transform({type})];
  }
  
}, StagesUI);