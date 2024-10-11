import { isBefore, isSameDay, isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';

// 월별 렌더링 컴포넌트
const CalendarMonth: React.FC<{
  dateCount: number;
  month: any;
  selectedDates: Date[];
  onSelectDate: (day: any) => void;
}> = ({ dateCount, selectedDates, month, onSelectDate }) => {
  const [title, setTitle] = useState<string>('');
  const [todayMonthYn, setTodayMonthYn] = useState<boolean>(false);
  const [nowDate, setNowDate] = useState<any>(Date);
  const [weekList, setWeekList] = useState<any[]>([]);

  const formatDate = (year: number, month: number): string => {
    const date = new Date(year, month - 1);
    const yearFormatted = date.getFullYear();
    const monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
    return `${yearFormatted}년 ${monthFormatted}월`;
  };
  const updateWeekList = () => {
    let haveChangeYn = false;
    const tempList = month.days.map((week: any[]) =>
      week.map((day) => {
        const currentDate = new Date(day.year, day.month - 1, day.day);

        const singleSelectedYn =
          selectedDates.length === 1 &&
          isSameDay(currentDate, selectedDates[0]);
        const beforeFirstYn =
          dateCount > 1 &&
          selectedDates.length > 0 &&
          isBefore(currentDate, selectedDates[0]);
        const firstSelectedYn =
          selectedDates.length > 1 && isSameDay(currentDate, selectedDates[0]);
        const middleSelectedYn =
          selectedDates.length > 2 &&
          selectedDates
            .slice(1, selectedDates.length - 1)
            .some((date) => isSameDay(currentDate, date));
        const middleYn =
          selectedDates.length > 1 &&
          !middleSelectedYn &&
          isWithinInterval(currentDate, {
            start: selectedDates[0],
            end: selectedDates[selectedDates.length - 1],
          });
        const lastSelectedYn =
          selectedDates.length > 1 &&
          isSameDay(currentDate, selectedDates[selectedDates.length - 1]);

        haveChangeYn =
          haveChangeYn === true ||
          day['singleSelectedYn'] !== singleSelectedYn ||
          day['beforeFirstYn'] !== beforeFirstYn ||
          day['firstSelectedYn'] !== firstSelectedYn ||
          day['middleSelectedYn'] !== middleSelectedYn ||
          day['middleYn'] !== middleYn ||
          day['lastSelectedYn'] !== lastSelectedYn;

        return {
          ...day,
          singleSelectedYn,
          beforeFirstYn,
          firstSelectedYn,
          middleSelectedYn,
          middleYn,
          lastSelectedYn,
        };
      })
    );

    if (haveChangeYn) {
      setWeekList(tempList);
    }
  };
  useEffect(() => {
    updateWeekList();
  }, [selectedDates]);

  useEffect(() => {
    const formattedTitle = formatDate(month.year, month.month);
    setTitle(formattedTitle);
    const now = new Date();
    setNowDate(now.getDate());
    if (
      now.getFullYear() === month.year &&
      now.getMonth() + 1 === month.month
    ) {
      setTodayMonthYn(true);
    } else {
      setTodayMonthYn(false);
    }
  }, [month]);
  return (
    <div className="month">
      <h2 className="calendar-month">{title}</h2>
      <div className="calendar-days">
        {weekList.map((week: any, weekIndex: number) => (
          <div className="week" key={weekIndex}>
            {week.map((day: any, dayIndex: number) => (
              <div
                key={dayIndex}
                className={`day ${day.holidayYn ? 'holiday' : ''} ${
                  dayIndex === 0 ? 'sunday' : ''
                } ${dayIndex === week.length - 1 ? 'saturday' : ''}`}>
                {day.day ? (
                  <button
                    type="button"
                    className={`btn-day ${
                      todayMonthYn && day.day === nowDate ? 'today' : ''
                    } ${day.singleSelectedYn ? 'selected' : ''} ${
                      day.firstSelectedYn ? 'selected-first' : ''
                    } ${day.middleYn ? 'middle' : ''} ${
                      day.middleSelectedYn ? 'selected-middle' : ''
                    } ${day.lastSelectedYn ? 'selected-last' : ''}`}
                    onClick={() => onSelectDate(day)}>
                    {day.day}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CalendarMonth;
