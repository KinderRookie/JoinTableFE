import React, { useState } from 'react';
import DatePicker from './DatePicker'; // Import the DatePicker component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for toastify



const MainApp = () => {
  const [eventName, setEventName] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [timeUnit, setTimeUnit] = useState('1 hour');
  const [earliestTime, setEarliestTime] = useState('08:00');
  const [latestTime, setLatestTime] = useState('22:00');
  const [isButtonVisible, setIsButtonVisible] = useState(false); // New state for the button
  const [eventUuid, setEventUuid] = useState(''); // State to store the uuid from backend


  const handleDateChange = (date) => {
    const dateString = date.toDateString();
    if (selectedDates.find(d => d.toDateString() === dateString)) {
      // If date is already selected, remove it
      setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateString));
    } else {
      // Otherwise, add the selected date
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedDates.length === 0) {
    alert('최소한 하나의 날짜를 선택해주세요.');
    return;
  }

    // Prepare the data to be sent as JSON
    const eventData = {
      eventName,
      selectedDates: selectedDates.map(date => {
    // Create a Date object in the KST timezone
    const kstDate = new Date(date).toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' });

    // Convert the KST date to a new Date object and return the ISO string
    return new Date(kstDate).toISOString();
  }),
      timeUnit,
      earliestTime,
      latestTime
    };

    // Send the data using fetch as JSON
    try {
      const response = await fetch('http://localhost:8000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData), // Convert the eventData to JSON
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse);
        // alert('Event successfully created!');

                toast.success('Event successfully created!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });



                // Enable the button
        setEventUuid(jsonResponse.url);
        setIsButtonVisible(true);
        // window.location.href = `http://localhost:3000/event/${eventUrl}`;

      } else {
        console.error('Error:', response.statusText);
        // alert('Failed to create event');

        toast.error('Failed to create event. Please try again.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Failed to create event');

      toast.error('Failed to connect to the server. Please try again later.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mb-6 -mt-10">
        <h1 className="text-xl font-bold text-center mb-4">Create Your Event</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name:</label>
            <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                required
            />
          </div>

          {/* Use the DatePicker Component */}
          <DatePicker selectedDates={selectedDates} handleDateChange={handleDateChange}/>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time Unit:</label>
            <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}>
              <option value="1 hour">1 Hour</option>
              <option value="30 mins">30 Minutes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">No Earlier Than:</label>
            <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={earliestTime}
                onChange={(e) => setEarliestTime(e.target.value)}>
              {['06:00', '07:00', '08:00', '09:00', '10:00'].map((time) => (
                  <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <label className="block text-sm font-medium text-gray-700">No Later Than:</label>
            <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={latestTime}
                onChange={(e) => setLatestTime(e.target.value)}>
              {['18:00', '19:00', '20:00', '21:00', '22:00'].map((time) => (
                  <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          {/* Initially hidden button, only shown after POST success */}


          <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Event
          </button>
          <button
              type="button"
              disabled={!isButtonVisible}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isButtonVisible
                      ? 'bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                      : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={() => {
                if (isButtonVisible) {
                  window.location.href = `http://localhost:3000/event/${eventUuid}`;
                }
              }}
          >
            Go to Event
            </button>
        </form>
      </div>

    </div>
);
}

export default MainApp;