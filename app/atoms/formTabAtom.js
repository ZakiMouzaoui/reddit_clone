import { atom } from "recoil";

const defaultState = {
  index: 0,
};

export const formTabState = atom({
  key: "formTab",
  default: defaultState,
});
