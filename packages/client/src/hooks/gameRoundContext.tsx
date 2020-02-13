import React, {Dispatch, FunctionComponent, Reducer, ReducerAction, useReducer} from "react";
import axios from "axios";
import {GameRound} from "@gobygame/models";


interface State {
  loading: boolean;
  error?: Error;
  gameRounds: GameRound[];
}

export enum RoundActions {
  FETCH_ROUNDS_REQUEST = 'FETCH_ROUNDS_REQUEST',
  FETCH_ROUNDS_SUCCESS = 'FETCH_ROUNDS_SUCCESS',
  FETCH_ROUNDS_FAILURE = 'FETCH_ROUNDS_FAILURE',
}

interface Action<T> {
  type: RoundActions;
  payload?: T;
}

type GameRoundReducer<T> = Reducer<State, Action<T>>;

const gameRoundReducer: GameRoundReducer<any> = (state: State, action: Action<any>) => {
  switch (action.type) {
    case RoundActions.FETCH_ROUNDS_SUCCESS:
      return {
        loading: false,
        error: undefined,
        gameRounds: action.payload,
      };
    case RoundActions.FETCH_ROUNDS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        gameRounds: [],
      };
    case RoundActions.FETCH_ROUNDS_REQUEST:
      return {
        loading: true,
        error: undefined,
        gameRounds: [],
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

const gameRoundMiddleware = (dispatch: Dispatch<ReducerAction<GameRoundReducer<any>>>) =>
  (action: Action<any>) => {
    switch (action.type) {
      case RoundActions.FETCH_ROUNDS_REQUEST: {
        axios.get(`/api/rounds`)
          .then(response => dispatch({type: RoundActions.FETCH_ROUNDS_SUCCESS, payload: response.data.data}))
          .catch(error => dispatch({type: RoundActions.FETCH_ROUNDS_FAILURE, payload: error}));

        dispatch(action);
        break;
      }
      default:
        dispatch(action);
    }
  };

const UserStateContext = React.createContext<State | null>(null);
const UserDispatchContext = React.createContext<Dispatch<ReducerAction<GameRoundReducer<any>>> | null>(null);

export const GameRoundProvider: FunctionComponent = ({children}) => {
  const [state, dispatch] = useReducer(gameRoundReducer, {
    loading: true,
    gameRounds: [],
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={gameRoundMiddleware(dispatch)}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
};

export const useGameRounds = (): [State, Dispatch<ReducerAction<GameRoundReducer<any>>>] => {
  const state = React.useContext(UserStateContext);
  const dispatch = React.useContext(UserDispatchContext);

  return [state!, dispatch!]
};
