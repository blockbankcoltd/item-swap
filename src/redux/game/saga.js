import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  delay,
} from "redux-saga/effects";
import { SEARCH_GAME } from "../actions";

import { searchGameSuccess, searchGameError } from "../actions";

const searchGameAsync = async (searchText) => {
  const Games = Moralis.Object.extend("Games");
  const query = new Moralis.Query(Games);
  // query.fullText("collectionAddress", searchText);
  query.equalTo("status", "ACTIVE");
  query.equalTo("isActive", true);
  // query.equalTo("market", localStorage.getItem("activeMarket"));
  query.equalTo("chainId", localStorage.getItem("chainId"));
  return await query
    .find()
    .then((response) => response)
    .catch((error) => error);
};
function* searchGame(action) {
  console.log("action", action);
  try {
    let searchResult = yield call(searchGameAsync, action.payload.searchText);
    if (searchResult && searchResult.length > 0) {
      console.log("searchResult", searchResult);
      let gameListdata = [];
      let gameList = JSON.parse(JSON.stringify(searchResult));
      console.log("gameList", gameList);
      gameList = gameList.filter(
        (eachGame) =>
          eachGame.gameInfo.name
            .toLowerCase()
            .indexOf(action.payload.searchText.toLowerCase()) !== -1,
      );

      yield put(
        searchGameSuccess({
          success: true,
          message: "",
          searchedGame: gameList,
        }),
      );
      action.payload.callback(JSON.parse(JSON.stringify(searchResult)));
      delay(4000);
      yield put(searchGameSuccess({ success: "", message: "" }));
    } else {
      yield put(searchGameError({ success: false, message: "Game not found" }));
      delay(4000);
      yield put(searchGameError({ success: "", message: "" }));
    }
  } catch (error) {
    yield put(searchGameError({ success: false, message: "Game not found" }));
    delay(4000);
    yield put(searchGameError({ success: "", message: "" }));
  }
}

export function* watchSearchGame() {
  yield takeLatest(SEARCH_GAME, searchGame);
}

export default function* rootSaga() {
  yield all([fork(watchSearchGame)]);
}
