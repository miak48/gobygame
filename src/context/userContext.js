import React, {useEffect} from 'react'
import uuidv4 from 'uuid/v4';

const UserStateContext = React.createContext(null);
const UserDispatchContext = React.createContext(null);

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ROUND_INCREMENT': {
      return {...state, round: state.round + 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

const UserProvider = ({children}) => {
  const [user, dispatch] = React.useReducer(userReducer, {
    uuid: localStorage.getItem('uuid') || uuidv4(),
    round: Number(localStorage.getItem('round')) || 1,
  });

  useEffect(() => {
    localStorage.setItem('uuid', user.uuid);
    localStorage.setItem('round', user.round.toString());
  }, [user.round]);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
};

const useUser = () => {
  const user = React.useContext(UserStateContext);
  const dispatch = React.useContext(UserDispatchContext);

  return [user, dispatch]
};

export {UserProvider, useUser}
