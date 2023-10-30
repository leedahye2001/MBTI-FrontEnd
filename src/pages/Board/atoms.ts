import { atom } from 'recoil';

export const passwordState = atom({
  key: 'passwordState', // 고유한 아톰 키
  default: '', // 비밀번호의 기본값을 여기에 설정
});
