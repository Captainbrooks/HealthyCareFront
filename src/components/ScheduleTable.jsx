import React from 'react';

const ScheduleTable = ({ department, schedule }) => {
  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase()
    .slice(0, 3);

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{department}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {days.map((day) => (
          <div
            key={day}
            className={`flex justify-between px-4 py-3 ${day.startsWith(today) ? 'bg-blue-50' : ''}`}
          >
            <span className="text-gray-600 capitalize">{day}</span>
            <span
              className={`font-medium ${
                schedule[day] === '24/7'
                  ? 'text-green-600'
                  : schedule[day] === 'Closed'
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              {schedule[day]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTable;
