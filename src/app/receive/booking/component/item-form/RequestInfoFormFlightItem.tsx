import DateSelectionModal from '@/components/modal/calendar/Calendar';
import DestinationModal from '@/components/modal/destination/DestinationModal';
import FormInput from '@/components/shared/FormInput';
import SelectBox from '@/components/shared/SelectBox'; // SelectBox 컴포넌트를 별도로 생성하여 사용
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  generateCabinClassOptionList,
  generateFlightTimeOptionList,
} from '../../../../../services/optionService';

const RequestListInfoFormFlightItem: React.FC<any> = ({
  flightItem,
  flightItemIndex,
  control,
  onItemChange,
}) => {
  // 로컬 상태 관리
  const [airportType, setAirportType] = useState<string>('');
  const [destinationVisible, setDestinationVisible] = useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  // 목적지 선택 모달 닫기 핸들러
  const destinationClosed = () => setDestinationVisible(false);

  // 입력 필드 값 변경 시 부모로 전달
  const handleInputChange = (field: string, value: string) => {
    onItemChange(flightItemIndex, field, value);
  };

  // 목적지 선택 핸들러
  const selectDestination = (destination: any) => {
    setDestinationVisible(false);
    if (airportType === 'origin') {
      handleInputChange('originAirportCode', destination.destinationCode);
      handleInputChange('originAirportName', destination.destinationNameLn);
    } else {
      handleInputChange('destinationAirportCode', destination.destinationCode);
      handleInputChange(
        'destinationAirportName',
        destination.destinationNameLn
      );
    }
  };

  // 출발지 및 도착지 선택 핸들러
  const handleClick = (type: 'origin' | 'destination') => {
    setAirportType(type);
    setDestinationVisible(true);
  };

  // 출발 날짜 선택 모달 열기
  const calendarOpen = () => setCalendarVisible(true);

  // 출발 날짜 선택 모달 닫기
  const calendarClose = () => setCalendarVisible(false);

  // 출발 날짜 선택 완료 핸들러
  const clickSubmit = (value: any) => {
    setCalendarVisible(false);
    handleInputChange('departureDate', value);
  };

  return (
    <div className="flight-schedule-search">
      <div className="schedule-wrap oneway">
        {/* 출발지 버튼 */}
        <Controller
          name={`${flightItemIndex}.originAirportCode`} // 필드 이름 동적으로 설정
          control={control} // props로 전달된 control 객체 사용
          render={({ field }) => (
            <button
              type="button"
              className={`schedule-column ${
                !flightItem.originAirportName ? 'default' : ''
              }`}
              onClick={() => handleClick('origin')}>
              {flightItem.originAirportName ? (
                <>
                  <strong className="title">
                    {flightItem.originAirportName}
                  </strong>{' '}
                  {/* 저장된 변수를 사용하여 출력 */}
                  <strong className="airport">
                    {flightItem.originAirportCode}
                  </strong>
                </>
              ) : (
                <>
                  <strong className="title">출발지</strong>
                  <span className="airport">선택</span>
                </>
              )}
            </button>
          )}
        />

        {/* 도착지 버튼 */}
        <Controller
          name={`${flightItemIndex}.destinationAirportCode`} // 필드 이름 동적으로 설정
          control={control} // props로 전달된 control 객체 사용
          render={({ field }) => (
            <button
              type="button"
              className={`schedule-column ${
                !flightItem.destinationAirportName ? 'default' : ''
              }`}
              onClick={() => handleClick('destination')}>
              {flightItem.destinationAirportName ? (
                <>
                  <strong className="title">
                    {flightItem.destinationAirportName}
                  </strong>{' '}
                  {/* 저장된 변수를 사용하여 출력 */}
                  <strong className="airport">
                    {flightItem.destinationAirportCode}
                  </strong>
                </>
              ) : (
                <>
                  <strong className="title">도착지</strong>
                  <span className="airport">선택</span>
                </>
              )}
            </button>
          )}
        />

        {/* 출발지와 목적지 둘 중 하나라도 선택 시 변경 버튼 활성화 */}
        <button
          type="button"
          className="btn-change"
          disabled={
            flightItem.originAirportCode || flightItem.destinationAirportCode
          } // 변수 값을 사용하여 상태 확인
        >
          변경
        </button>
      </div>

      {/* 항공편 정보 입력 필드 */}
      <ul className="search-area">
        <li>
          <div className="form-group receive">
            <Controller
              name={`${flightItemIndex}.departureDate`}
              control={control} // props로 전달된 control 객체 사용
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="날짜 선택"
                  className="input md line cal"
                  onClick={calendarOpen}
                  value={flightItem.departureDate[0]}
                />
              )}
            />

            <Controller
              name={`${flightItemIndex}.departureTime`}
              control={control} // props로 전달된 control 객체 사용
              render={({ field }) => (
                <SelectBox
                  {...field}
                  options={generateFlightTimeOptionList()}
                  useAllOptionName="출발시간 선택"
                  onChange={(e) => handleInputChange('departureTime', e)}
                />
              )}
            />
          </div>
        </li>
        <li>
          <div className="input md line">
            <Controller
              name={`${flightItemIndex}.cabinClassCode`}
              control={control} // props로 전달된 control 객체 사용
              render={({ field }) => (
                <SelectBox
                  {...field}
                  options={generateCabinClassOptionList()}
                  useAllOptionName="좌석 선택"
                  onChange={(e) => handleInputChange('cabinClassCode', e)}
                />
              )}
            />
          </div>
        </li>
      </ul>

      <DestinationModal
        itemCategoryCode="IC01"
        visible={destinationVisible}
        onClose={destinationClosed}
        onSelected={selectDestination}
      />
      <DateSelectionModal
        visible={calendarVisible}
        dateCount={1}
        categoryCode="IC01"
        onClose={calendarClose}
        clickSubmit={clickSubmit}
      />
    </div>
  );
};

export default RequestListInfoFormFlightItem;
