import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { Text, Pane } from 'evergreen-ui';


const StyledLink = styled(Link)`
  text-decoration: none;
`;


const propTypes = {
  displayName: PropTypes.string.isRequired,
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
  requiresExact,
  spaceBefore,
  to,
}) => {
  const match = useRouteMatch(to);
  const isExactMatch = Boolean(match && match.isExact);

  const isActive = requiresExact ? isExactMatch : Boolean(match);

  const textColor = isActive ? 'selected' : 'muted';

  const marginTop = spaceBefore ? 30 : 0;

  return (
    <Pane marginTop={marginTop}>
      <StyledLink to={to}>
        <Pane
          display="flex"
          justifyContent="flex-end"
          padding={5}
          paddingRight={20}
        >
          <Text
            size={500}
            color={textColor}
          >
            { displayName }
          </Text>
        </Pane>
      </StyledLink>
    </Pane>
  );
};

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
