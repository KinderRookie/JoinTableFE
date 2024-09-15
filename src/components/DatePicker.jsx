//DatePicker.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DatePicker.css'; // Import the CSS for date selection styles

const DatePicker = ({ selectedDates, handleDateChange }) => {
    const firstSelectedDate = selectedDates.length > 0 ? selectedDates[0] : null;

  // Set the minDate as the first selected date (if any) and maxDate as 30 days after that
  // const minDate = firstSelectedDate ? firstSelectedDate : new Date();
    const minDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));    // Today's date on KST
  const maxDate = firstSelectedDate ? new Date(firstSelectedDate.getTime() + 30 * 24 * 60 * 60 * 1000) : null;

    const isSelected = (date) => {
    return selectedDates.some(d => d.toDateString() === date.toDateString());
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">일정을 지정할 날짜를 모두 골라주세요:</label>
      <Calendar
        onClickDay={handleDateChange} // Handle clicks on individual days
        value={null} // No default value since we're selecting multiple dates
        selectRange={false} // No range selection, just specific dates
        tileClassName={({ date }) =>
          isSelected(date) ? 'selected-date' : ''}
        minDate={minDate}
        maxDate={maxDate}
      />

      {/* Display selected dates as a list */}
      <div className="mt-4">
        <h3 className="font-medium text-gray-700">선택된 날짜들:</h3>
        <ul className="list-disc list-inside">
          {selectedDates.length > 0 ? (
            selectedDates.map((date, index) => (
              <li key={index} className="text-gray-700">
                {date.toLocaleDateString('ko-KR')}
              </li>
            ))
          ) : (
            <p className="text-gray-500">선택된 날짜가 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;