import { atom } from "recoil";

export const userAtom = atom({
  key: "userAuthState",
  default: null,
});