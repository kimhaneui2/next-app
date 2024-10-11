'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import FormInput from '@/components/shared/FormInput';
import useUserStore from '@/store/userStore';
import { bookerInfo } from '../services/travelerService';
import { useBookerFormStore } from '../store/travelerStore';

const BookerInfoForm: React.FC = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateBookerFormValues } = useBookerFormStore();
  const [formValues, setFormValues] = useState(bookerInfo);

  useEffect(() => {
    if (userInfo) {
      setFormValues({
        name: userInfo.name || '',
        mobileNo: userInfo.mobileNo || '',
        email: userInfo.emailAddress || '',
      });
    }
  }, [userInfo]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: value,
      };
      updateBookerFormValues(updatedValues);
      return updatedValues; // setFormValues를 위한 반환값
    });
  }, []);

  const validationErrors = useMemo(() => {
    return {
      mobileNo: !/^\d*$/.test(formValues.mobileNo),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email),
    };
  }, [formValues.mobileNo, formValues.email]);

  const __nameDeptPosition = useMemo(() => {
    return userInfo?.deptName && userInfo.positionName
      ? `${userInfo.name} / ${userInfo.deptName}`
      : `${userInfo?.name} / ${userInfo?.outsideStaffTypeName}`;
  }, [userInfo]);

  return (
    <div className="contents-box type1">
      <h2 className="contents-title3 mg-b16">
        <strong className="bold">예약자 정보</strong>
      </h2>
      <form>
        <ul className="form-type1" style={{ color: 'black' }}>
          <li className="form-item">
            <div className="form-item-title">
              <label>
                <sup>예약자 명</sup>
              </label>
            </div>
            <FormInput
              name="__nameDeptPosition"
              value={__nameDeptPosition}
              onChange={handleChange}
              disabled={true}
            />
          </li>
          <li className="form-item">
            <div className="form-item-title">
              <label>
                <sup>휴대폰 번호</sup>
              </label>
            </div>
            <FormInput
              name="mobileNo"
              value={formValues.mobileNo}
              onChange={handleChange}
              placeholder="숫자만 입력"
              isInvalid={validationErrors.mobileNo}
              maxLength={11}
            />
          </li>
          <li className="form-item">
            <div className="form-item-title">
              <label>
                <sup>이메일 주소</sup>
              </label>
            </div>
            <FormInput
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="이메일 주소 입력"
              isInvalid={validationErrors.email}
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default BookerInfoForm;
