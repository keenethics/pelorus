import React, { PropTypes } from 'react';

const StageHeader = ({ stage }) => (
  <span>
    { stage && stage.title() }
    { stage && stage.progress() ? ` (${stage.progress()}%)` : '' }
  </span>
);

StageHeader.propTypes = {
  stage: PropTypes.object,
};

export default StageHeader;
