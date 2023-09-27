import { atom } from "recoil";

export const userVotes = atom({
  default: [],
  key: "userVotes",
});
