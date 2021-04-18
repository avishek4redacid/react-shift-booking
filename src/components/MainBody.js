// library imports
import React, { Component } from 'react';

// module level imports
import PersonalTab from './PersonalTab';

// helper routine to get the grouped shift response
export const groupedShiftResponse = (shifts) => {
  let groupedShiftResponse = {};
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  shifts.forEach((shift) => {
    const startTime = shift.startTime;
    const month = monthNames[new Date(startTime).getMonth()];
    const date = new Date(startTime).getDate();
    const fullDate = `${month} ${date}`
    if (!(fullDate in groupedShiftResponse)) {
      groupedShiftResponse[fullDate] = [shift];
    } else { groupedShiftResponse[fullDate].push(shift); }
  })
  return groupedShiftResponse;
}

class MainBody extends Component {
  render() {
    const { items, setData } = this.props;
    return (
      <div className="row col-md-12">
        <div className="col-md-3" />
        <div className="col-md-6">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true">
                My Shifts
              </a>
              <a
                className="nav-item nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false">
                Available Shifts
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              className="card tab-pane fade show active">
              <PersonalTab
                items={groupedShiftResponse(items.filter((key) => key.booked === true))}
                isUserTab={false}
                setData={setData}
              />
            </div>
            <div
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              className="card tab-pane fade">
              <nav>
                <div className="nav nav-tabs" id="nav-tab-user" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="nav-tab1" data-toggle="tab"
                    href="#nav-user1"
                    role="tab"
                    aria-controls="nav-user1"
                    aria-selected="true">
                    Helsinki ({items.filter((key) => key.area === 'Helsinki').length})
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab2"
                    data-toggle="tab"
                    href="#nav-user2"
                    role="tab"
                    aria-controls="nav-user2"
                    aria-selected="false">
                    Tampere ({items.filter((key) => key.area === 'Tampere').length})
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab3"
                    data-toggle="tab"
                    href="#nav-user3"
                    role="tab"
                    aria-controls="nav-user3"
                    aria-selected="false">
                    Turku ({items.filter((key) => key.area === 'Turku').length})
                  </a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  id="nav-user1"
                  role="tabpanel"
                  aria-labelledby="nav-tab1" className="tab-pane fade show active">
                  <PersonalTab
                    items={groupedShiftResponse(items.filter((key) => key.area === 'Helsinki'))}
                    isUserTab
                    setData={setData}
                  />
                </div>
                <div
                  id="nav-user2"
                  role="tabpanel" aria-labelledby="nav-tab2" className="tab-pane fade">
                  <PersonalTab
                    items={groupedShiftResponse(items.filter((key) => key.area === 'Tampere'))}
                    isUserTab
                    setData={setData}
                  />
                </div>
                <div
                  id="nav-user3"
                  role="tabpanel" aria-labelledby="nav-tab3" className="tab-pane fade">
                  <PersonalTab
                    items={groupedShiftResponse(items.filter((key) => key.area === 'Turku'))}
                    isUserTab
                    setData={setData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

export default MainBody;
