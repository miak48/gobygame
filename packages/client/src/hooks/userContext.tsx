import React, {Dispatch, FunctionComponent, Reducer, ReducerAction, useEffect, useReducer} from 'react'
import uuidv4 from 'uuid/v4';


interface User {
  uuid: string;
  round: number; // TODO: Remove round from user, no longer being used
}

export enum UserActionType {
  ROUND_INCREMENT = 'ROUND_INCREMENT'
}

interface Action {
  type: UserActionType;
}

type UserReducer = Reducer<User, Action>;

const UserStateContext = React.createContext<User | null>(null);
const UserDispatchContext = React.createContext<Dispatch<ReducerAction<UserReducer>> | null>(null);

const userReducer: UserReducer = (state, action) => {
  switch (action.type) {
    case UserActionType.ROUND_INCREMENT: {
      return {...state, round: state.round + 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

export const UserProvider: FunctionComponent = ({children}) => {
  const [user, dispatch] = useReducer(userReducer, {
    uuid: localStorage.getItem('uuid') || uuidv4(),
    round: Number(localStorage.getItem('round')) || 1,
  });

  useEffect(() => {
    localStorage.setItem('uuid', user.uuid);
    localStorage.setItem('round', user.round.toString());
  }, [user.uuid, user.round]);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
};

export const useUser = (): [User, Dispatch<ReducerAction<UserReducer>>] => {
  const user = React.useContext(UserStateContext);
  const dispatch = React.useContext(UserDispatchContext);

  return [user!, dispatch!]
};
