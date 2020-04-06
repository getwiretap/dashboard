import React from 'react';
import PropTypes from 'prop-types';

import FullPageLoader from 'components/FullPageLoader';


const propTypes = {
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
};

const CreateNewUser = ({
  displayName,
  email,
  photoURL,
}) => {
  console.log('displayName', displayName);
  console.log('email', email);
  console.log('photoURL', photoURL);

  return (
    <FullPageLoader />
  );
};

CreateNewUser.propTypes = propTypes;

export default CreateNewUser;
