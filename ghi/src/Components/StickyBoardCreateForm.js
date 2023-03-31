import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function StickyBoardCreateForm() {
  const [boardName, setBoardName] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [user, setUser] = useState([]);
  const handleBoardNameChange = (event) => {
    const value = event.target.value;
    setBoardName(value);
  }
  const handlePriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
  }
  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  }
  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  }
  const handleUserChange = (event) => {
    const value = event.target.value;
    setUser(value);
  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.boardName = boardName;
    data.priority = priority;
    data.startDate = startDate;
    data.deadline = deadline;
    data.user = user;
    const url = "http://localhost:8080/api/stickyboard/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getAppointmentsData()
      navigate('/appointments');
    }
  }
  return(
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Service Appointment</h1>
            <form onSubmit={handleSubmit} id="create-vehiclemodels-form">
              <div className="form-floating mb-3">
                <input onChange={handleVINChange} value={vin} placeholder="vin" required type="text" maxLength="17" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCustomerNameChange} value={customerName} placeholder="customerName" required type="text" name="text" id="customerName" className="form-control align-middle" />
                <label htmlFor="Customer Name">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleDatetimeChange} value={datetime} placeholder="datetime" required type="datetime-local" name="datatime" id="datatime" className="form-control align-middle" />
                <label htmlFor="datetime">Date & Time</label>
              </div>
              <div className="mb-3">
                <select onChange={handleTechnicianChange} value={technician} required id="technician" name="technician" className="form-select">
                  <option value="">Choose a technician</option>
                  {technicians.map((technician) => {
                          return (
                            <option value={technician.id} key={technician.id}>
                              {technician.name}
                            </option>
                          );
                        })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleReasonChange} value={reason} placeholder="reason" required type="text" name="text" id="reason" className="form-control align-middle" />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default StickyBoardCreateForm;
