import { atom } from "recoil";

const defaultModalState = {
  isOpened: false,
  view: "login",
};

export const authModalState = atom({
  key: "authModalState",
  default: defaultModalState,
});
