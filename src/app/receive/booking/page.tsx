'use client';
import { useEffect } from 'react';

import { login } from '@/services/apiService';
import useUserStore from '@/store/userStore';

import BookerInfoForm from './component/BookerInfoForm';
import RequestInfoForm from './component/RequestInfoForm';
import TravelerInfoForm from './component/TravelerInfoForm';
import {
  useBookerFormStore,
  useTravelersFormStore,
} from './store/travelerStore';
import { useflightFormStore } from './store/useFlightStore';
const BookingPage = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const flightFormValues = useflightFormStore(
    (state) => state.flightFormValues
  );
  const getBookerFormValues = useBookerFormStore(
    (state) => state.bookerFormValues
  );
  const getTravelersFormValues = useTravelersFormStore(
    (state) => state.travelersFormValues
  );
  const handleLogin = async () => {
    try {
      const condition = {
        expiredYn: false,
        stationTypeCode: 'STN02',
        userId: 'haneui.kim@traport.com',
        userPassword: 'qwe123!@#',
      };
      const result = await login(condition);
      setUserInfo(result);
    } catch (err: any) {}
  };
  const onSubmit = () => {
    console.log(
      '전체 항공 정보:',
      flightFormValues,
      getBookerFormValues,
      getTravelersFormValues
    );
  };
  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <div id="wrap">
      <header id="header">
        <button type="button" className="btn-page-back">
          뒤로가기
        </button>
        <h1 className="title">상담원 예약접수</h1>
        <button type="button" className="btn-header-mypage">
          마이페이지
        </button>
        <button type="button" className="btn-header-menu">
          메뉴
        </button>
      </header>
      <main id="container">
        <div id="contents">
          <BookerInfoForm />
          <TravelerInfoForm />
          <RequestInfoForm />
        </div>
        <div className="contents-btn-area">
          <div className="btn-group">
            <button type="button" className="btn lg primary" onClick={onSubmit}>
              상담원 예약 요청
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
