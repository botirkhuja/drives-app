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

export const selectApp = (state: AppState) => state.app;

export const userDriverInfoSelector = createSelector(
  selectApp,
  state => state.userDriver
)
export const allDriverInfoSelector = createSelector(
  selectApp,
  state => state.drivers
)
export const driverInfoSelector = createSelector(
  selectApp,
  state => state.driver || state.userDriver
)
export const driverSelector = createSelector(
  allDriverInfoSelector,
  (drivers: DriverI.Info[], props: DriverI.Cell) => drivers.find( driver => driver.cell === props.cell )
)

export const allTripsSelector = createSelector(
  selectApp,
  state => state.trips
)
export const tripsSelector = createSelector(
  allTripsSelector, driverInfoSelector,
  (trips, driver) => {
    if (driver && driver.role && driver.role.admin) {
      return trips;
    }
    return trips && trips.filter( trip => trip.driverID === driver.cell )
  }
)
export const todaysTripsSelector = createSelector(
  tripsSelector,
  trips => trips && trips.filter(trip => new Date(trip.pickupDate).getDate() === new Date().getDate())
)
export const futureTripsSelector = createSelector(
  tripsSelector,
  trips => trips && trips.filter(trip => new Date(trip.pickupDate).getDate() > new Date().getDate())
)
export const pastTripsSelector = createSelector(
  tripsSelector,
  trips => trips && trips.filter(trip => new Date(trip.pickupDate).getDate() < new Date().getDate())
)
export const commissioningTripsSelector = createSelector(
  tripsSelector,
  trips => trips && trips.filter(
    trip => !trip.commissioned &&
      new Date(trip.pickupDate).getDate() < new Date().getDate()
  )
)
export const tripsCountSelector = createSelector(
  tripsSelector,
  trips => trips && trips.length
)
export const tripInfoSelector = createSelector(
  selectApp,
  state => state.trip
)
export const driversAndTripsSelector = createSelector(
  allDriverInfoSelector,
  allTripsSelector,
  (drivers, allTrips) => [drivers, allTrips]
)

export const isAdminSelector = createSelector(
  selectApp,
  state => state.userDriver && state.userDriver.role.admin
)

export const toolbarBottonsForAdminSelector = createSelector(
  isAdminSelector, selectUrl, selectRouteParams,
  ( isAdmin, url, params ) => {
    let actionButtons = [];
    if ( isAdmin ) {
      const { tripId, cell } = params;
      if (tripId) {
        actionButtons = [
          {
            icon: 'money',
            url: url + '/commissioned',
            action: 'commissionPaid',
          },
          {
            icon: 'edit',
            url: url + '/edit',
            action: 'editTrip',
          },
          {
            icon: 'delete',
            url: url + '/delete',
            action: 'deleteTrip'
          },
        ]
      } else if (cell) {
        actionButtons = [
          {
            icon: 'money',
            url: url + '/commissioning',
            action: 'commissionSelector',
          },
          {
            icon: 'add',
            url: '/trips/new',
            action: 'addNewTrip',
          },
          {
            icon: 'edit',
            url: url+'/edit',
            action: 'editDriver',
          },
          {
            icon: 'delete',
            url: url + '/delete',
            action: 'deleteDriver'
          },
        ]
      }

      if (url.endsWith('/drivers')) {
        actionButtons = [
          {
            icon: 'add',
            url: '/drivers/new',
            action: 'addNewDriver',
          }
        ]
      } else if (url.endsWith('/trips')) {
        actionButtons = [
          {
            icon: 'money',
            url: url + '/commissioning',
            action: 'commissionSelector',
          },
          {
            icon: 'add',
            url: '/trips/new',
            action: 'addNewTrip',
          }
        ]
      } else if (url.endsWith('/new') || url.endsWith('/edit') || url.endsWith('/commissioning')) {
        // const urlArray = url.split('/');
        // urlArray.pop();
        // urlArray.push('save');
        actionButtons = [
          // {
          //   icon: 'save',
          //   url: urlArray.join('/'),
          //   action: 'save',
          // },
        ]
      }
    }
    return [...actionButtons]
  }
)

export const commissionPriceSelector = createSelector(
  tripsSelector,
  trips => trips && trips.reduce<number>((result, trip) => {
      const priceToBeCommissioned = trip.commissioned ? 0 : trip.price - (trip.tollAmount || 0);
      result += priceToBeCommissioned * 0.15;
      return result
    }, 0 )
)

// export const selectRouteId = selectRouteParam('id');
// export const selectStatus = selectQueryParam('status');

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
