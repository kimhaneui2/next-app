import { useEffect, useState } from 'react';

const CalendarHeader: React.FC<{
  dateList: any[];
  categoryCode: string;
  dateCount: number;
}> = ({ dateList, categoryCode, dateCount }) => {
  const [itineraryList, setItineraryList] = useState<string[]>([]);
  const [activatedIndex, setActivatedIndex] = useState<number>(0);
  const titleCollection: any = {
    IC01: ['가는날', '오는날'],
    IC02: ['체크인', '체크아웃'],
    IC03: ['대여일', '반납일'],
    IC05: ['가는날', '오는날'],
    IC07: ['가는날', '오는날'],
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (!dateString) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    const newItineraryList = Array(dateCount).fill('');
    dateList.forEach((date, index) => {
      newItineraryList[index] = date;
    });
    setItineraryList(newItineraryList);

    const firstEmptyIndex = newItineraryList.findIndex((date) => !date);
    setActivatedIndex(firstEmptyIndex !== -1 ? firstEmptyIndex : 0);
  }, [dateList, dateCount]);

  return (
    <div id="calendar-header">
      {/* 날짜 선택 버튼 리스트 */}
      {itineraryList.map((itineraryDate, index) => (
        <button
          key={index}
          type="button"
          className={`day-column ${index === activatedIndex ? 'active' : ''} ${
            !itineraryDate ? 'default' : ''
          }`}>
          <strong className="title">
            {titleCollection[categoryCode][index]}
          </strong>
          {/* 날짜가 없으면 '날짜 선택'을 표시 */}
          <strong className="date">
            {itineraryDate ? formatDate(itineraryDate) : '날짜 선택'}
          </strong>
        </button>
      ))}
    </div>
  );
};
export default CalendarHeader;
