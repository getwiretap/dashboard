import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Card } from 'evergreen-ui';

import SessionDescriptionLine from 'components/SessionDescriptionLine';
import { text as textColor } from 'theme/colors';


const propTypes = {
  displayName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};


const CashierCard = ({ displayName, password }) => {
  const passwordText = `Access code: ${password}`;

  return (
    <Card
      display="flex"
      width={460}
      padding={40}
      marginBottom={20}
      background="white"
      elevation={2}
    >
      <Pane marginRight={30}>
        <SessionDescriptionLine
          icon="dot"
          iconColor={textColor.default}
          text={displayName}
        />
        <SessionDescriptionLine
          icon="dot"
          iconColor={textColor.default}
          text={passwordText}
        />
      </Pane>
    </Card>
  );
};

CashierCard.propTypes = propTypes;

export default CashierCard;
