import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Pane, Code } from 'evergreen-ui';

import { scales, text as textColor } from 'theme/colors';
import {
  getSessionColor,
  getSessionStatus,
  getSessionStatusDisplayName,
} from 'utils/sessions';


const propTypes = {
  session: PropTypes.shape({
    deviceId: PropTypes.string,
    deviceName: PropTypes.string,
    password: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  session: null,
};

const SessionDescription = ({ session }) => {
  const status = getSessionStatus(session);
  const statusText = getSessionStatusDisplayName(session);

  const password = session && session.password;
  const passwordText = `Access code: ${password}`;
  const passwordColor = status === 'online' ? textColor.default : scales.N6;
  const passwordIcon = status === 'online' ? 'chevron-right' : 'small-tick';
  const passwordIconColor = status === 'online' ? scales.N6 : scales.N5;

  const indicatorColor = getSessionColor(session);

  return (
    <Pane
      flexGrow={0}
      flexShrink={1}
      display="flex"
      flexDirection="column"
    >
      <Pane
        display="flex"
        alignItems="center"
      >
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          width={22}
        >
          <Icon
            icon="dot"
            color={indicatorColor}
            paddingBottom={1}
          />
        </Pane>
        <Code
          boxShadow="none"
          background="none"
          padding={0}
        >
          { statusText}
        </Code>
      </Pane>
      {
        password && (
          <Pane
            display="flex"
            alignItems="center"
          >
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              width={22}
            >
              <Icon
                icon={passwordIcon}
                color={passwordIconColor}
                paddingBottom={1}
              />
            </Pane>
            <Code
              boxShadow="none"
              background="none"
              padding={0}
              color={passwordColor}
            >
              { passwordText }
            </Code>
          </Pane>
        )
      }
    </Pane>
  );
};

SessionDescription.propTypes = propTypes;
SessionDescription.defaultProps = defaultProps;

export default SessionDescription;
