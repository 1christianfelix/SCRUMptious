import React, {useState, useEffect} from 'react';



function StickyBoardCreateForm({accounts}) {
  const [boardName, setBoardName] = useState('');
  const [priority, setPriority] = useState('');
  const [start, setStart] = useState('');
  const [deadline, setDeadline] = useState('');
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }

  const filteredAccounts = accounts.filter((account) =>
  account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <select onChange={handlePriorityChange} value={priority} required placeholder="Select Priority" id="Priority" name="Priority" className="form-select">
                  <option value="">Select Priority</option>
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

      <input onChange={handleSearchTermChange} value={searchTerm} type="text" placeholder="Search Member" />

<br />
<hr />

    <ul>
      {filteredAccounts.map((filteredAccount) => {
        return (
        <li key={filteredAccount.id}>
          <input
            type="checkbox"
            checked={members.includes(filteredAccount.id)}
            onChange={(event) => {
              if (event.target.checked) {
                setMembers([...members, filteredAccount.id]);
              } else {
                setMembers(members.filter((id) => id !== filteredAccount.id));
              }
            }}
          />
          { filteredAccount.last_name }, {filteredAccount.first_name} <br />
          { filteredAccount.email } <br />
        </li>
        );
      })}
    </ul>
</div>





        </div>
      </div>
  );
}

export default StickyBoardCreateForm;
