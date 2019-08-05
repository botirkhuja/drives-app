import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './app.reducer';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  app: fromApp.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  app: fromApp.reducer,
};

export const selectRouter = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

const {
  selectQueryParams,    // select the current route query params
  // selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  // selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

export const appSelector = (state: AppState) => state.app;

export const driverInfoSelector = createSelector(
  appSelector,
  state => state.driver
)
export const allDriverInfoSelector = createSelector(
  appSelector,
  state => state.drivers
)

// export const selectRouteId = selectRouteParam('id');
// export const selectStatus = selectQueryParam('status');

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
