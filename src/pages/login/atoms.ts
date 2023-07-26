import { atom, selector } from "recoil";

export const isAuthenticatedAtom = atom<boolean>({
  key: "isAuthenticated",
  default: false, // 로그인 상태를 기본적으로 false로 설정
});

export const userAtom = atom({
  key: "userAtom",
  default: { name: "", email: "" },
});

export const userNameSelector = selector({
  key: "userNameSelector",
  get: ({ get }) => {
    const user = get(userAtom);
    return user.name;
  },
});

export const userEmailSelector = selector({
  key: "userEmailSelector",
  get: ({ get }) => {
    const user = get(userAtom);
    return user.email;
  },
});
