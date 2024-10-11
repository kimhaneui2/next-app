import { calendar } from '@/services/apiService';
import useModalStore from '@/store/modalStore';
import React, { useEffect, useState } from 'react';
import CalendarHeader from './component/CalendarHeader';
import CalendarMonth from './component/CalendarMonth';

// 모달 컴포넌트
const DateSelectionModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  clickSubmit: (data: Date[]) => void;
  dateCount: number;
  categoryCode: string;
}> = ({ visible, onClose, dateCount, categoryCode, clickSubmit }) => {
  const { openModal, closeModal } = useModalStore();
  const [calendarRs, setCalendars] = useState<any>(null);
  const [selectDataList, setSelectDataList] = useState<any>([]);

  const callCalendars = async () => {
    try {
      const condition = {
        countryCode: 'KR',
        itemCategoryCode: categoryCode,
      };
      const result = await calendar(condition);
      setCalendars(result);
    } catch (err: any) {}
  };

  const onSelectDate = (dayInfo: any) => {
    if (!dayInfo.selectableYn) {
      return;
    }
    const newDate = new Date(dayInfo.year, dayInfo.month - 1, dayInfo.day + 1)
      .toISOString()
      .substring(0, 10);

    let newList = [newDate];
    setSelectDataList(newList);
  };

  const onInitSelected = () => {
    setSelectDataList([]);
  };

  useEffect(() => {
    callCalendars();
  }, []);
  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
    return () => {
      if (visible) {
        closeModal();
      }
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="modal type1">
      <div className="modal-contents">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h1 className="title">날짜 선택</h1>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            닫기
          </button>
        </div>

        {/* 모달 바디 */}
        <div className="modal-body">
          <div id="mo-calendar">
            {/* 달력 헤더 컴포넌트 */}
            <CalendarHeader
              dateCount={dateCount}
              categoryCode={categoryCode}
              dateList={selectDataList}
            />

            {/* 달력 본문 */}
            <div id="calendar-body">
              <div className="week-header">
                <div className="day sunday">일</div>
                <div className="day">월</div>
                <div className="day">화</div>
                <div className="day">수</div>
                <div className="day">목</div>
                <div className="day">금</div>
                <div className="day saturday">토</div>
              </div>

              {/* 월별 데이터 반복 렌더링 */}
              {calendarRs.calendars.map((month: any, index: number) => (
                <CalendarMonth
                  key={index}
                  dateCount={dateCount}
                  selectedDates={selectDataList}
                  month={month}
                  onSelectDate={onSelectDate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <div className="btn-group both">
            <button
              type="button"
              className="btn lg line"
              onClick={onInitSelected}>
              초기화
            </button>
            <button
              type="button"
              className="btn lg primary"
              style={{ marginTop: '0px' }}
              onClick={() => clickSubmit(selectDataList)}>
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionModal;
