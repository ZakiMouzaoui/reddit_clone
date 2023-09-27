import { atom } from "recoil";

export const testData = atom({
  key: "testData",
  default: null,
});

export const testLoading = atom({
  key: "testLoading",
  default: false,
});
