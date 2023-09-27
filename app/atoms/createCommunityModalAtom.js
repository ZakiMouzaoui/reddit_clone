import { atom } from "recoil";

const defaultModalState = {
  isOpened: false,
};

export const communityModalState = atom({
  key: "createCommunityModal",
  default: defaultModalState,
});
