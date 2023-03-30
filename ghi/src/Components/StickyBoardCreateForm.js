import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function StickyBoardCreateForm({getAppointmentsData, technicians}) {
  const [customerName, setCustomerName] = useState('');
  const [vin, setVIN] = useState('');
  const [reason, setReason] = useState('');
  const [datetime, setDatetime] = useState('');
  const [technician, setTechnician] = useState('');
  const handleCustomerNameChange = (event) => {
    const value = event.target.value;
    setCustomerName(value);
  }
  const handleVINChange = (event) => {
    const value = event.target.value;
    setVIN(value);
  }
  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
  }
  const handleDatetimeChange = (event) => {
    const value = event.target.value;
    setDatetime(value);
  }
  const handleTechnicianChange = (event) => {
    const value = event.target.value;
    setTechnician(value);
  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.customer_name = customerName;
    data.vin = vin;
    data.reason = reason;
    data.datetime = datetime;
    data.technician = technician;
    const url = "http://localhost:8080/api/appointments/";
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
