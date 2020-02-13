import React, {Dispatch, FunctionComponent, Reducer, ReducerAction, useEffect, useReducer} from 'react'
import uuidv4 from 'uuid/v4';


export interface Attempts {
  [roundId: string]: number
}

interface User {
  uuid: string;
  attempts: Attempts;
}

export enum UserActionType {
  ROUND_INCREMENT = 'ROUND_INCREMENT'
}

interface Action {
  type: UserActionType;
  roundId: number;
}

type UserReducer = Reducer<User, Action>;

const ROUND_PREFIX = "round-" as const;

const UserStateContext = React.createContext<User | null>(null);
const UserDispatchContext = React.createContext<Dispatch<ReducerAction<UserReducer>> | null>(null);

const userReducer: UserReducer = (state, action) => {
  switch (action.type) {
    case UserActionType.ROUND_INCREMENT: {
      return {
        uuid: state.uuid,
        attempts: {
          ...state.attempts,
          [String(action.roundId)]: (state.attempts[String(action.roundId)] ?? 0) + 1,
        }
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

const readRoundAttemptsFromLocalStorage = () => {
  const addToAttempts = (accumulator: Attempts, attempts: [string, string]) => ({
    ...accumulator,
    [[...attempts[0]].splice(ROUND_PREFIX.length).join('')]: Number(attempts[1])
  });

  return Object.entries(localStorage)
    .filter(key => key[0].includes('round-'))
    .reduce(addToAttempts, {});
};

export const UserProvider: FunctionComponent = ({children}) => {
  const [user, dispatch] = useReducer(userReducer, {
    uuid: localStorage.getItem('uuid') || uuidv4(),
    attempts: readRoundAttemptsFromLocalStorage(),
  });

  useEffect(() => {
    localStorage.setItem('uuid', user.uuid);
    Object.entries(user.attempts).forEach((entry) => {
      localStorage.setItem(ROUND_PREFIX + entry[0], entry[1].toString());
    })
  }, [user.uuid, user.attempts]);

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
