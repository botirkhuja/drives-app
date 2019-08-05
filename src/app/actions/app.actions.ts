import { createAction, props } from "@ngrx/store";

export const storeDriverInformation = createAction('[APP] Store Driver Information', props<{payload: DriverI.Info}>())
