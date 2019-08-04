import { createAction, props } from "@ngrx/store";

export const storeUserInformation = createAction('[APP] Store User Information', props<{payload: DriverI.Info}>())
