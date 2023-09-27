import { atom, selector } from "recoil";
import { formTabState } from "./formTabAtom";

export const currentCommunity = atom({
  key: "currentCommunity",
  default: null,
});

export const titleState = atom({
  key: "formTitle",
  default: "",
});

export const descriptionState = atom({
  key: "formDescription",
  default: "",
});

export const imagesState = atom({
  key: "formImages",
  default: [],
});

export const linkState = atom({
  key: "formLink",
  default: "",
});

export const isValidLinkState = selector({
  key: "isValidLink",
  default: {
    isValid: false,
    errorMessage: null,
  },
  get: ({ get }) => {
    const linkValue = get(linkState);

    if (linkValue) {
      try {
        new URL(linkValue);
        return { isValid: true, errorMessage: null };
      } catch (err) {
        return { isValid: false, errorMessage: "Link doesn't look right" };
      }
    } else {
      return {
        isValid: false,
        errorMessage: null,
      };
    }
  },
});

export const isInvalidFormSelector = selector({
  key: "isInvalidForm",
  default: true,
  get: ({ get }) => {
    const { index } = get(formTabState);
    const title = get(titleState);
    const community = get(currentCommunity);
    let images = [];
    let linkValue = "";
    let isValid = false;

    if (index === 1) {
      images = get(imagesState);
    } else if (index === 2) {
      linkValue = get(linkState);
      isValid = get(isValidLinkState).isValid;
    }

    return (
      !community ||
      title === "" ||
      (index === 1 && images.length === 0) ||
      (index === 2 && (linkValue === "" || isValid === false))
    );
  },
});

export const captionsState = atom({
  key: "formCaptions",
  default: [],
});

export const imageIndexState = atom({
  key: "imgIdxState",
  default: 0,
});
