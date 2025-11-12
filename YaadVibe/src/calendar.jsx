import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';

export default function Calendar({ onDatesChange }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    onDatesChange(ranges.selection);
  };

  return (
    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '12px' }}>
      <h3>Schedule Your Trip</h3>
      <DateRangePicker ranges={state} onChange={handleSelect} />
      <p>Selected: {format(state[0].startDate, 'MMM dd')} - {format(state[0].endDate, 'MMM dd')}</p>
    </div>
  );
}
