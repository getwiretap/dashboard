import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Card } from 'evergreen-ui';


const propTypes = {
  fullName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};


const CashierCard = ({
  fullName,
  password,
}) => (
  <Card
    display="flex"
    width={460}
    padding={40}
    marginBottom={20}
    background="white"
    elevation={2}
  >
    <Pane marginRight={30}>
      { fullName }
      { password }
    </Pane>
  </Card>
);

CashierCard.propTypes = propTypes;

export default CashierCard;
