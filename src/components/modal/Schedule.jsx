import { useState, useEffect } from "react"
import "./modal.css"

const options = ["No repeat", "Specific date", "Daily", "Weekly"]

export default function Schedule({
  scheduleType,
  onScheduleTypeChange,
  onScheduleValueChange,
}) {
  const [time, setTime] = useState("13:00")
  const [date, setDate] = useState("2019/05/22")
  const [dayOfWeek, setDayOfWeek] = useState("Wednesday")

  const handleScheduleTypeChange = (event) => {
    onScheduleTypeChange(event.target.value)
  }

  const handleTimeChange = (event) => {
    setTime(event.target.value)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const handleWeekChange = (event) => {
    setDayOfWeek(event.target.value)
  }

  useEffect(() => {
    let localScheduleValue
    switch (scheduleType) {
      case options[1]:
        localScheduleValue = {
          date,
          time,
        }
        break
      case options[2]:
        localScheduleValue = { time }
        break
      case options[3]:
        localScheduleValue = { dayOfWeek, time }
        break
      default:
        localScheduleValue = {}
        break
    }
    onScheduleValueChange(localScheduleValue)
  }, [time, date, dayOfWeek])

  const getDateTime = () => {
    switch (scheduleType) {
      case options[1]:
        return (
          <>
            <label className="label">Everyday at</label>
            <div className="content">
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
              />
              <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                at
              </span>
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
          </>
        )
      case options[2]:
        return (
          <>
            <label className="label">Date</label>
            <div className="content">
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
          </>
        )
      case options[3]:
        return (
          <>
            <label className="label">Every</label>
            <div className="content">
              <select
                name="week"
                style={{ padding: "10px" }}
                value={dayOfWeek}
                onChange={handleWeekChange}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                at
              </span>
              <input
                type="time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
          </>
        )
      default:
        return <div className="row" />
    }
  }

  return (
    <>
      <div className="row">
        <label className="label">Schedule</label>
        {options.map((option) => (
          <div
            style={{
              display: "inline-block",
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
            key={option}
          >
            <input
              type="radio"
              value={option}
              name="schedule"
              onChange={handleScheduleTypeChange}
              defaultChecked={option === options[0]}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <div className="row">{getDateTime()}</div>
    </>
  )
}
