import { createAction, props } from "@ngrx/store";

export const storeUserDriverInformation = createAction('[APP] Store Driver Information', props<{payload: DriverI.Info}>())
export const storeAllDriversInformation = createAction('[APP] Store All Drivers Information', props<{payload: DriverI.Info[]}>())
export const storeAllTripsInformation = createAction('[APP] Store All Trips Information', props<{payload: TripI.Info[]}>())
export const putNewTrip = createAction('[APP] Put New Trip to Firestore', props<{payload: TripI.Info}>())
export const updateTrip = createAction('[APP] Update Trip to Firestore', props<{payload: {trip: TripI.Info, id: string}}>())
export const activateDriver = createAction('[APP] Activate Driver', props<{payload: DriverI.Cell}>())
export const deactivateDriver = createAction('[APP] Deactivate Driver');
export const getTripInformation = createAction('[APP] Get Trip Information', props<{payload: TripI.Info}>())
