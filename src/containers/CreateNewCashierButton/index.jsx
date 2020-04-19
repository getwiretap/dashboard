import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Pane, Text } from 'evergreen-ui';

import { CASHIER_NEW } from 'routes';
import { brand as brandColor } from 'theme/colors';


const ButtonLink = styled(Link)`
  text-decoration: none;
`;


const CreateNewCashierButton = () => (
  <Pane
    display="flex"
    justifyContent="flex-start"
  >
    <ButtonLink to={CASHIER_NEW}>
      <Pane
        display="flex"
        alignItems="center"
        paddingX={20}
        paddingY={10}
        background={brandColor.accent}
        borderRadius={4}
        elevation={1}
      >
        <Icon
          icon="plus"
          color="white"
          size={12}
          marginLeft={-2}
          marginRight={5}
        />
        <Text color="white">
          Create new cashier
        </Text>
      </Pane>
    </ButtonLink>
  </Pane>
);

export default CreateNewCashierButton;
