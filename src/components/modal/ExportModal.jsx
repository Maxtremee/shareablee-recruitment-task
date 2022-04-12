import { useState } from "react"
import Schedule from "./Schedule"
import "./modal.css"

export default function ExportModal() {
  const [reportName, setReportName] = useState("")
  const [format, setFormat] = useState("Excel")
  const [email, setEmail] = useState("")
  const [scheduleType, setScheduleType] = useState("No repeat")
  const [scheduleValue, setScheduleValue] = useState(null)

  const reportNameHandler = (event) => {
    setReportName(event.target.value)
  }

  const formatHandler = (event) => {
    setFormat(event.target.value)
  }

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    fetch("https://postmanecho.com/post", {
      method: "POST",
      body: JSON.stringify({
        reportName,
        format,
        email,
        schedule: { type: scheduleType, value: scheduleValue },
      }),
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.error(err))
  }
  
  return (
    <div className="wrapper">
      <header>Export Report</header>
      <form name="shareablee">
        <div className="form-content">
          <div className="row">
            <label htmlFor="report-name" className="label">
              Report name
            </label>
            <input
              id="report-name"
              className="content"
              type="text"
              placeholder="Shareablee report"
              onChange={reportNameHandler}
              value={reportName}
            />
          </div>
          <div className="row">
            <label className="label">Format</label>
            <input
              name="format"
              id="format-excel"
              type="radio"
              value="Excel"
              onChange={formatHandler}
              defaultChecked
            />
            <label htmlFor="format-excel">Excel</label>
            <input name="format" id="format-csv" type="radio" value="CSV" />
            <label htmlFor="format-csv">CSV</label>
          </div>
          <div className="row">
            <label htmlFor="email" className="label">
              E-mail to
            </label>
            <input
              id="email"
              className="content"
              type="email"
              placeholder="client@company.com"
              onChange={emailHandler}
              value={email}
            />
          </div>
          <Schedule
            scheduleType={scheduleType}
            onScheduleTypeChange={setScheduleType}
            onScheduleValueChange={setScheduleValue}
          />
        </div>
        <footer>
          <button className="button button-cancel">Cancel</button>
          <button className="button button-ok" onClick={submitHandler}>
            OK
          </button>
        </footer>
      </form>
    </div>
  )
}
