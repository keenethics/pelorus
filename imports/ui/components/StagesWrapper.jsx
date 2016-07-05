import React from 'react';
import StagesUI from './StagesUI.jsx';
import Stage from './Stage.jsx';
import { Stages } from '/imports/api/stages/stages.js';

export default class StagesWrapper extends React.Component {

  renderChildren( stage ) {
    let children = Stages.findOne().children(stage) || [];
    return ( <StagesUI
                stages={ children }
                stagesType={ Stages.relativeType(this.props.stagesType, 1) }
                activeStagesType={ this.props.activeStagesType } />
    );
  }
  handleClick(e) {
    e.stopPropagation();
    Session.set('activeStages', this.props.stagesType );
  }
  renderChildStage() {
    const active = this.props.stagesType === this.props.activeStagesType;
    const substages = this.props.stagesType !== 'week' ?
      <div className='substages'>
        { this.renderChildren( this.props.stage ) }
      </div> : null;
    return (
      <div className={`stage
          ${ active ? 'active' : ''}
          ${ this.props.stage ? '' : 'dashed'}`}
        onClick={ this.handleClick.bind(this) }
      >
        <Stage stage={ this.props.stage } active={ active } />
          { substages }
      </div>
    );
  }
  render() {
    return this.renderChildStage();
  }
}
