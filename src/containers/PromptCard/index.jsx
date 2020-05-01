import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Card, Heading } from 'evergreen-ui';


const propTypes = {
  label: PropTypes.string.isRequired,
};


const CashierCard = ({ label }) => (
  <Card
    display="flex"
    width={460}
    padding={40}
    marginBottom={20}
    background="white"
    elevation={2}
  >
    <Pane marginRight={30}>
      <Heading>
        { label }
      </Heading>
    </Pane>
  </Card>
);

CashierCard.propTypes = propTypes;

export default CashierCard;
