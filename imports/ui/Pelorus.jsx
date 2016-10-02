import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Stages } from '/imports/api/stages/stages.js';
import { Goals } from '/imports/api/goals/goals.js';
import Navigation from './components/Navigation.jsx';
import ModalLoggedAlert from './components/ModalLoggedAlert.jsx';
import StagesUI from './components/StagesUI.jsx';
import { GoTutorial } from '/imports/api/user/goTutorial.js';
import '/imports/startup/client/constants.js';

function Pelorus(props) {
  const stages = Stages.find({ type: 'years' }, { sort: { startsAt: -1 } }).fetch();
  return (
    <div className="container" style={{ marginTop: '10px' }}>
      <Navigation goTutorial={ props.goTutorial } />
      <StagesUI
        stages={ stages.length ? stages : [Stages._transform({ type: 'years' })] }
        stagesType="years"
        activeStagesType={ props.activeStagesType }
      />
      <ModalLoggedAlert />
    </div>
  );
}

Pelorus.propTypes = {
  goTutorial: PropTypes.func,
  activeStagesType: PropTypes.string,
};

function foo() {
  return {
    goals: Goals.find().fetch(),
    stages: Stages.find().fetch(),
    goTutorial: GoTutorial,
  };
}

export default createContainer(foo, Pelorus);
