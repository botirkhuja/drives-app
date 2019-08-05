import { Action, createReducer, on } from '@ngrx/store';
import { storeDriverInformation } from '../actions/app.actions';

export interface State {
    driver: DriverI.Info;
}

const initialState: State = {
    driver: null,
};

const createdReducer = createReducer(
  initialState,
  on(storeDriverInformation, (state, {payload}) => ({ ...state, driver: { ...payload } })),
);

export function reducer(state: State | undefined, action: Action) {
  return createdReducer(state, action);
}
