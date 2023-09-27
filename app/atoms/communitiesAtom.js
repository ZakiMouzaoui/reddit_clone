import { atom } from "recoil";

const defaultCommunitiesState = {
  mySnippets: [],
};

export const currentCommunityAtom = atom({
  key: "currentCommunity",
  default: null,
});

export const communityState = atom({
  key: "communitiesState",
  default: defaultCommunitiesState,
});
