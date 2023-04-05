import React, {useState} from 'react';



function StickyBoardCreateForm({accounts}) {
  const [boardName, setBoardName] = useState('');
  const [priority, setPriority] = useState('');
  const [start, setStart] = useState('');
  const [deadline, setDeadline] = useState('');
  const [members, setMembers] = useState([]);


  const switchPriority = [{"priority": "High", "number": 3}, {"priority": "Medium", "number": 2}, {"priority": "Low", "number": 1}]

  const handleBoardNameChange = (event) => {
    const value = event.target.value;
    setBoardName(value);
  }
  const handlePriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);

  }
  const handleStartChange = (event) => {
    const value = event.target.value;
    setStart(value);
  }
  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  }
  const handleMemberChange = (event) => {
    const value = event.target.value;
    setMembers(value);
    console.log(members)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.board_name = boardName;
    data.priority = parseFloat(priority);
    data.start_date = start;
    data.deadline = deadline;
    data.account = members;
    const url = "http://localhost:8000/stickyboard";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("ok")  // should be redirect to stickyboard list page
    }
  }
  return(
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit} id="create-form">
              <div className="form-floating mb-3">
                <input onChange={handleBoardNameChange} value={boardName} placeholder="StickyBoard Name" required type="text" maxLength="17" name="vin" id="vin" className="form-control" />
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="Priority">Priority</label>
                <select onChange={handlePriorityChange} value={priority} required id="Priority" name="Priority" className="form-select">
                  {switchPriority.map((priorities) => {
                          return (
                            <option value={priorities.number} key={priorities.number}>
                              {priorities.priority}
                            </option>
                          );
                        })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="Start">Start</label>
                <input onChange={handleStartChange} value={start} placeholder="Start" required type="datetime-local" name="datatime" id="datatime" className="form-control align-middle" />
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="Deadline">Deadline</label>
                <input onChange={handleDeadlineChange} value={deadline} placeholder="Deadline" required type="datetime-local" name="datatime" id="datatime" className="form-control align-middle" />
              </div>

              <div className="form-floating mb-3">
                <label htmlFor="Members">Members</label>
                        {members.length}

              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>

    <div className="d-flex">

      {/* <input className="form-control me-2" onChange={searchAccount} value={searchedAccount} type="search" placeholder="Search VIN" aria-label="Search" />
      <button className="btn btn-outline-success me-2" type="button" onClick={handleSearch} >Search VIN</button> */}

<br />
<hr />

    <ul>
      {accounts.map((account) => {
        return (
        <li key = {account.id}> { account.last_name }, {account.first_name} - {account.email} </li>
        );
      })}
    </ul>


    {/* <input onChange={handleMemberChange} value={members} placeholder="Members" type="text" name="text" id="reason" className="form-control align-middle" /> */}

</div>





        </div>
      </div>
  );
}

export default StickyBoardCreateForm;
