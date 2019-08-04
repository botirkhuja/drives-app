// import { Action, createReducer, on } from '@ngrx/store';
// import * as ScoreboardPageActions from '../actions/scoreboard-page.actions';

// export interface State {
//   home: number;
//   away: number;
// }

// const initialState: State = {
//   home: 0,
//   away: 0,
// };

// const createdReducer = createReducer(
//   initialState,
//   on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
//   on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
//   on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
//   on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
// );

// export function reducer(state: State | undefined, action: Action) {
//   return createdReducer(state, action);
// }
