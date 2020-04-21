import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Pane, Text } from 'evergreen-ui';

import { brand as brandColor } from 'theme/colors';


const NoDecorationLink = styled(Link)`
  text-decoration: none;
`;


const propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const defaultProps = {
  iconName: null,
};

const ButtonLink = ({ iconName, text, to }) => (
  <Pane
    display="flex"
    justifyContent="flex-start"
  >
    <NoDecorationLink to={to}>
      <Pane
        display="flex"
        alignItems="center"
        paddingX={20}
        paddingY={10}
        background={brandColor.accent}
        borderRadius={4}
        elevation={1}
      >
        {
            iconName && (
              <Icon
                icon={iconName}
                color="white"
                size={12}
                marginLeft={-2}
                marginRight={5}
              />
            )
        }
        <Text color="white">
          { text }
        </Text>
      </Pane>
    </NoDecorationLink>
  </Pane>
);

ButtonLink.propTypes = propTypes;
ButtonLink.defaultProps = defaultProps;

export default ButtonLink;
