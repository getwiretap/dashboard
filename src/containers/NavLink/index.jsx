import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { Icon, Text, Pane } from 'evergreen-ui';

import {
  brand as brandColor,
  scales as scaleColor,
} from 'theme/colors';


const StyledLink = styled(Link)`
  text-decoration: none;
`;


const propTypes = {
  displayName: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  requiresExact: PropTypes.bool,
  spaceBefore: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const defaultProps = {
  requiresExact: false,
  spaceBefore: false,
};


const NavLink = ({
  displayName,
  iconName,
  requiresExact,
  spaceBefore,
  to,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const match = useRouteMatch(to);
  const isExactMatch = Boolean(match && match.isExact);
  const isActive = requiresExact ? isExactMatch : Boolean(match);

  const backgroundColor = isHovering ? scaleColor.N2 : 'none';
  const foregroundColor = isActive ? brandColor.secondary : scaleColor.N6;

  const marginTop = spaceBefore ? 30 : 0;

  return (
    <Pane
      marginTop={marginTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      backgroundColor={backgroundColor}
    >
      <StyledLink to={to}>
        <Pane
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          paddingTop={5}
          paddingBottom={5}
          paddingLeft={40}
        >
          <Pane
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={20}
            marginRight={8}
          >
            <Icon
              color={foregroundColor}
              icon={iconName}
            />
          </Pane>
          <Pane
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Text
              size={500}
              color={foregroundColor}
            >
              { displayName }
            </Text>
          </Pane>
        </Pane>
      </StyledLink>
    </Pane>
  );
};

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
