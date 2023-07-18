import { atom } from 'recoil';

// Recoil의 atom 상태 정의
export const isLoggedInState = atom<boolean>({
  key: 'isLoggedInState',
  default: false,
});