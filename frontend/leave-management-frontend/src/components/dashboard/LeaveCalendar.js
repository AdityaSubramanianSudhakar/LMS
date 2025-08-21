import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getLeaveRequestsByEmployee } from "../../api/leaveRequestApi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parseISO } from "date-fns";
import moment from "moment";

const localizer = momentLocalizer(moment);

const LeaveCalendar = ({ employeeId }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // ✅ track current date

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await getLeaveRequestsByEmployee(employeeId);
        const leaves = res.data.map((leave) => ({
          id: leave.id,
          title: `${leave.leaveType} (${leave.status})`,
          start: parseISO(leave.startDate),
          end: parseISO(leave.endDate),
          allDay: true,
        }));
        setEvents(leaves);
      } catch (err) {
        console.error("Failed to fetch leaves", err);
      }
    };

    if (employeeId) {
      fetchLeaves();
    }
  }, [employeeId]);

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <h3>My Leave Calendar</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}                        // ✅ control date
        onNavigate={(date) => setCurrentDate(date)} // ✅ handle next/back
        style={{ height: 450 }}
        eventPropGetter={(event) => {
          let className = "";
          if (event.title.includes("APPROVED")) className = "leave-approved";
          else if (event.title.includes("PENDING")) className = "leave-pending";
          else if (event.title.includes("REJECTED")) className = "leave-rejected";

          return { className };
        }}
      />
    </div>
  );
};

export default LeaveCalendar;
