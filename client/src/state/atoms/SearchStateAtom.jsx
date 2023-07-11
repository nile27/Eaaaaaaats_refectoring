import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "searchKeywordState",
  storage: sessionStorage,
});

export const searchResultsState = atom({
  key: "searchResultsState",
  default: [],
});

export const searchDefaultState = atom({
  key: "searchDefaultState",
  default: [],
});

export const searchKeywordState = atom({
  key: "searchKeywordState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const searchInputState = atom({
  key: "searchInputState",
  default: "",
});
