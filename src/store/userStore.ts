import { CorporateInfo, UserInfo } from '@/types/user';
import { create } from 'zustand';
// Zustand 스토어의 타입 정의
interface UserStore {
  userInfo: UserInfo | null;
  corporateInfo: CorporateInfo | null;
  userNo: number | null;
  userToken: string | null;
  setUserInfo: (result: {
    user: UserInfo;
    corporateInfo: CorporateInfo;
    userNo: number;
    userToken: string;
  }) => void;
  clearUserInfo: () => void; // 로그아웃 또는 초기화할 때 사용
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: null, // 초기 상태는 null로 설정
  corporateInfo: null,
  userNo: null,
  userToken: null,

  // setUserInfo 함수에서 result 객체의 여러 값을 상태로 저장
  setUserInfo: (result) =>
    set({
      userInfo: result.user, // result.userInfo를 userInfo로 저장
      corporateInfo: result.corporateInfo, // corporateInfo 저장
      userNo: result.userNo, // userNo 저장
      userToken: result.userToken, // userToken 저장
    }),

  // clearUserInfo 함수에서 모든 상태를 초기화
  clearUserInfo: () =>
    set({
      userInfo: null,
      corporateInfo: null,
      userNo: null,
      userToken: null,
    }),
}));

export default useUserStore;
