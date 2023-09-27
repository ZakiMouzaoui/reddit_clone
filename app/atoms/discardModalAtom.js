import { atom } from "recoil";

export const isDiscardModalOpened = atom({
  key: "isDiscardModalAtom",
  default: false,
});

export const isActiveDiscardModal = atom({
  key: "isActivesModalAtom",
  default: false,
});
