// library imports
import React, { useState } from 'react';

// image imports
import loaderGreen from '../assets/spinner_green.svg';
import loaderRed from '../assets/spinner_red.svg';

function ShiftInfo(props) {
  const [isFetching, setIsFetching] = useState(false);
  const { shiftAlreadyStarted, startTime, endTime, item, isUserTab } = props;

  // book or cancel shift API call
  const updateShift = (shiftId, action) => {
    const { setData } = props;
    setIsFetching(true);
    fetch(`http://localhost:8080/shifts/${shiftId}/${action}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then((data) => {
        fetch('http://localhost:8080/shifts')
          .then(res => res.json())
          .then((data) => {
            setData(data);
            setIsFetching(false);
          })
          .catch(console.log)
      })
      .catch(console.log)
  }

  return (
    <div className="card-body">
      <h5 className="card-title">{startTime}-{endTime}</h5>
      {item.booked ?
        <button
          type="button"
          onClick={() => updateShift(item.id, 'cancel')}
          disabled={!!shiftAlreadyStarted}
          className="btn btn-outline-danger action-btn">
          {isFetching ?
            <img
              className="pic"
              alt="loader-green"
              src={loaderRed}
            />
            : 'Cancel'}
        </button> :
        <button
          type="button"
          onClick={() => updateShift(item.id, 'book')}
          disabled={!!item.overlapping}
          className="btn btn-outline-success action-btn">
          {isFetching ?
            <img
              className="pic"
              alt="loader-green"
              src={loaderGreen}
            /> : 'Book'}
        </button>
      }
      {!isUserTab && <p className="card-text">{item.area}</p>}
      {isUserTab && item.booked && <span className="status booked">Booked</span>}
      {isUserTab && item.overlapping && <span className="status overlapping">Overlapping</span>}

    </div>
  )
}

export default ShiftInfo
