import { createAction, props } from "@ngrx/store";

export const storeDriverInformation = createAction('[APP] Store Driver Information', props<{payload: DriverI.Info}>())
export const storeAllDriversInformation = createAction('[APP] Store All Drivers Information', props<{payload: DriverI.Info[]}>())
