import { Action, createReducer, on } from '@ngrx/store';
import { storeUserDriverInformation, storeAllDriversInformation, storeAllTripsInformation, activateDriver, deactivateDriver, getTripInformation } from '../actions/app.actions';

export interface State extends TripI.List, DriverI.List {
  driver: DriverI.Info;
  userDriver: DriverI.Info;
  trip: TripI.Info;
}

const initialState: State = {
    driver: null,
    userDriver: null,
    drivers: null,
    trip: null,
    trips: null,
};

const createdReducer = createReducer(
  initialState,
  on(storeUserDriverInformation, (state, {payload}) => ({ ...state, userDriver: payload && { ...payload }})),
  on(storeAllDriversInformation, (state, {payload}) => ({ ...state, drivers: [ ...payload ]})),
  on(getTripInformation, (state, {payload}) => {
    let trip = { ...payload };
    if ( state.drivers ) {
      const driver = state.drivers.find( driver => driver.cell === trip.driverID );
      trip = { ...trip, driverName: driver.name }
    }
    return { ...state, trip }
  }),
  on(storeAllTripsInformation, (state, {payload}) => {
    const trips = [...payload];
    trips.sort((a, b) => new Date(b.pickupDate).getTime() - new Date(a.pickupDate).getTime());
    return { ...state, trips }
  }),
  on(activateDriver, (state, {payload}) => {
    // const commission = trips && trips.reduce<number>((result, current) => {
    //   const priceToBeCommissioned = current.price - (current.tollAmount || 0);
    //   result += priceToBeCommissioned * 0.15;
    //   return result
    // }, 0 )
    const driver = state.drivers.find( driver => driver.cell === payload.cell)
    return {
      ...state,
      driver,
    }
  }),
  on(deactivateDriver, state => ({
    ...state,
    driver: null,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return createdReducer(state, action);
}
