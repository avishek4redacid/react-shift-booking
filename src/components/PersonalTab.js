// library imports
import React from 'react';

// module level imports
import ShiftInfo from './ShiftInfo';

function PersonalTab(props) {
  const { items, isUserTab, setData } = props;

  // helper routine to check if the date is today
  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth()
  }

  // helper routine to check if the date is tomorrow
  const isTomorrow = (someDate) => {
    const today = new Date()
    const tomorrowDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    if (tomorrowDate.getMonth() === someDate.getMonth() && tomorrowDate.getDate() === someDate.getDate()) {
      return true;
    }
    return false;
  }

  // helper routine to check if the shift has been already started
  const isShiftAlreadyStarted = (startTime, endTime) => {
    const currentDate = new Date().toLocaleTimeString();
    const valid = (
      new Date(startTime).toLocaleTimeString() < currentDate &&
      new Date(endTime).toLocaleTimeString() > currentDate
    );
    return valid;
  }

  return (
    <div>
      {Object.keys(items).map((key) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[new Date(key).getMonth()];
        const date = new Date(key).getDate();
        const fullDate = `${month} ${date}`;
        const isDayToday = isToday(new Date(key));
        const isDayTomorrow = isTomorrow(new Date(key));
        // determine the datetext for the UI
        let dateText;
        if (isDayToday) {
          dateText = 'Today';
        } else if (isDayTomorrow) {
          dateText = 'Tomorrow';
        } else dateText = fullDate;
        // calculate total shift duration 
        let totalTime = 0;
        let currItems = items[key];
        currItems.forEach((shiftKey) => {
          const endTime = shiftKey.endTime;
          const startTime = shiftKey.startTime;
          totalTime += (endTime - startTime) / (3600000);
        })
        // sort based on the start time
        currItems.sort(function (x, y) {
          if (x.startTime < y.startTime) {
            return -1;
          }
          if (x.startTime > y.startTime) {
            return 1;
          }
          return 0;
        });
        // check overlapping shifts
        for (let i = 1; i < currItems.length; i++) {
          if (currItems[i].startTime < currItems[i - 1].endTime) {
            if (currItems[i].booked && !currItems[i - 1].booked) {
              currItems[i - 1].overlapping = true;
            } else if (currItems[i - 1].booked && !currItems[i].booked) {
              currItems[i].overlapping = true;
            }
          }
        }

        return (
          <div key={key.id}>
            <div className="card-header">
              <span
                className="card-main-title">
                {dateText}
              </span>
              {!isUserTab &&
                <span style={{ color: '#A4B8D3' }}>
                  {items[key].length} shifts, {totalTime} h
                </span>
              }
            </div>
            {currItems.map((shiftItem) => {
              const endTime = new Date(shiftItem.endTime).toLocaleTimeString(
                [], { hour: '2-digit', minute: '2-digit' });
              const startTime = new Date(shiftItem.startTime).toLocaleTimeString(
                [], { hour: '2-digit', minute: '2-digit' });
              const shiftAlreadyStarted = (
                isShiftAlreadyStarted(shiftItem.startTime, shiftItem.endTime));
              return (
                <ShiftInfo
                  endTime={endTime}
                  startTime={startTime}
                  shiftAlreadyStarted={shiftAlreadyStarted}
                  item={shiftItem}
                  isUserTab={isUserTab}
                  setData={setData}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default PersonalTab
