import { Action, createReducer, on } from '@ngrx/store';
import { storeDriverInformation, storeAllDriversInformation } from '../actions/app.actions';

export interface State {
    driver: DriverI.Info;
    drivers: DriverI.Info[]
}

const initialState: State = {
    driver: null,
    drivers: null,
};

const createdReducer = createReducer(
  initialState,
  on(storeDriverInformation, (state, {payload}) => ({ ...state, driver: { ...payload } })),
  on(storeAllDriversInformation, (state, {payload}) => ({ ...state, drivers: [ ...payload ]})),
);

export function reducer(state: State | undefined, action: Action) {
  return createdReducer(state, action);
}
