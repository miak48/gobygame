import React from 'react'
import uuidv4 from 'uuid/v4';

export const user = {
  uuid: localStorage.getItem('uuid') || uuidv4(),
};

localStorage.setItem('uuid', user.uuid);

const UserContext = React.createContext(user);

export default UserContext;
