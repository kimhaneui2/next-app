import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import TravelerModal from '@/components/modal/traveler/TravelerModal';
import FormInput from '@/components/shared/FormInput';
import useUserStore from '@/store/userStore';
import { getAgeTypeCode } from '@/utils/travelerCustom';
import { FormValues, initialTravelerInfo } from '../services/travelerService';
import { useTravelersFormStore } from '../store/travelerStore';

// 출장자 정보 컴포넌트
const TravelerInfoForm: React.FC = () => {
  const { userInfo, corporateInfo } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { updateTravelersFormValues } = useTravelersFormStore();

  const showModal = (index: number) => {
    setIsModalVisible(true);
    setCurrentIndex(index);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSelectTraveler = (traveler: any) => {
    hideModal();
    update(currentIndex, {
      __nameDeptPosition:
        traveler.deptName && traveler.positionName
          ? `${traveler.name} / ${traveler.deptName} `
          : `${traveler.name} / ${traveler.outsideStaffTypeName}`,
      name: traveler.name,
      userNo: traveler.userNo,
      ageTypeCode: traveler.ageTypeCode,
      birthday: traveler.birthday,
      firstName: traveler.firstName,
      firstNameLn: traveler.firstNameLn,
      gender: traveler.gender,
      lastName: traveler.lastName,
      lastNameLn: traveler.lastNameLn,
      nationalityCode: traveler.nationalityCode,
      travelerIndex: currentIndex + 1,
    });
    updateTravelersFormValues(fields);
  };
  // react-hook-form의 useForm 훅을 사용하여 폼 상태 관리
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      travelers: [initialTravelerInfo],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'travelers',
  });

  const handleAddTraveler = () => {
    append(initialTravelerInfo);
  };

  const handleDeleteTraveler = () => {
    if (fields.length > 1) {
      remove(fields.length - 1);
    }
  };
  const setUserInfo = () => {
    if (userInfo && fields.length > 0) {
      update(0, {
        __nameDeptPosition:
          userInfo.deptName && userInfo.positionName
            ? `${userInfo.name} / ${userInfo.deptName} `
            : `${userInfo.name} / ${userInfo.outsideStaffTypeName}`,
        name: userInfo.name,
        userNo: userInfo.userNo,
        ageTypeCode: getAgeTypeCode(userInfo.birthday),
        birthday: userInfo.birthday,
        firstName: userInfo.firstName,
        firstNameLn: userInfo.firstNameKo,
        gender: userInfo.gender,
        lastName: userInfo.lastName,
        lastNameLn: userInfo.lastNameKo,
        nationalityCode: 'KR',
        travelerIndex: 1,
      });
    }
    console.log(fields, 'fe');

    updateTravelersFormValues(fields);
  };
  const resetTraveler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      update(index, initialTravelerInfo);
    } else {
      setUserInfo();
    }
  };

  // 폼 제출 핸들러
  const onSubmit = (data: FormValues) => {
    console.log('Submitted Data:', data);
  };

  useEffect(() => {
    setUserInfo();
  }, [userInfo]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="contents-box type1 line" style={{ color: 'black' }}>
          <h2 className="contents-title3 mg-b4">
            <strong className="bold">출장자 정보</strong>
          </h2>
          <h3 className="contents-title-sub mg-b12">
            * 일정이 동일한 출장자만 선택하시기 바랍니다.
          </h3>
          {corporateInfo?.assistantBookingYn && (
            <label className="checkbox type1 sm">
              <input
                type="checkbox"
                className="control-input"
                onChange={(e) => resetTraveler(e, 0)}
              />
              <span className="control-text">출장자와 실제 예약자가 다름</span>
            </label>
          )}
          <ul className="form-type1 mg-t20">
            {fields.map((field, index) => (
              <li
                key={field.id}
                className="form-item"
                onClick={() => {
                  showModal(index);
                }}>
                <div className="form-item-title">
                  <label>
                    <sup>{index + 1}번 출장자</sup>
                  </label>
                </div>
                <Controller
                  name={`travelers.${index}.__nameDeptPosition`}
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      name={`travelers.${index}.__nameDeptPosition`}
                      value={field.value}
                      placeholder="출장자 선택"
                      onChange={field.onChange}
                    />
                  )}
                />
              </li>
            ))}
          </ul>
          <div className="btn-group both mg-t16">
            {fields.length > 1 && (
              <button
                type="button"
                className="btn-content type2 delete sm"
                onClick={handleDeleteTraveler}>
                출장자 삭제
              </button>
            )}
            {corporateInfo?.companionBookingYn && (
              <button
                type="button"
                className="btn-content type1 add sm"
                onClick={handleAddTraveler}>
                출장자 추가
              </button>
            )}
          </div>
        </div>
      </form>
      {/* TravelerSearchModal 모달 컴포넌트 */}
      <TravelerModal
        visible={isModalVisible}
        onClose={hideModal}
        corporateInfo={{ outsideStaffBookingYn: true }}
        onSelectTraveler={handleSelectTraveler}
      />
    </>
  );
};

export default TravelerInfoForm;
