import React, { useState } from "react";

function StickyNoteCreateForm({ accounts }) {
  // console.log(accounts);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState("");
  const [start_date, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  // const [stickyBoard, setStickyBoard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const handlePriorityChange = (event) => {
    const value = event.target.value;
    setPriority(value);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
  };

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleDeadlineChange = (event) => {
    const value = event.target.value;
    setDeadline(value);
  };

  // const handleStickyBoardChange = (event) => {
  //   const value = event.target.value;
  //   setStickyBoard(value);
  // };
  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // const handleMemberChange = (event) => {
  //   const value = event.target.value;
  //   setMembers(value);
  // };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.subject = subject;
    data.content = content;
    data.priority = parseInt(priority);
    data.category = status;
    data.start_date = new Date(start_date + "T00:00:00");
    data.deadline = new Date(deadline + "T00:00:00");
    // data.stickyBoard = stickyBoard;
    data.account = members;

    console.log(data);

    const url = "http://localhost:8000/sticky";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("ok");

      setSubject("");
      setContent("");
      setPriority("");
      setStatus("");
      setStartDate("");
      setDeadline("");
      // setStickyBoard("");
      setMembers("");
    } else {
      console.error("Error:", response.status, await response.text());
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          {/* <h1>Add a Service Appointment</h1> */}
          <form onSubmit={handleSubmit} id="create-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleSubjectChange}
                value={subject}
                placeholder="subject"
                required
                type="text"
                maxLength="17"
                name="text"
                id="subject"
                className="form-control"
              />
              <label htmlFor="Subject">SubjectName</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleContentChange}
                value={content}
                placeholder="content"
                required
                type="text"
                name="text"
                id="content"
                className="form-control align-middle"
              />
              <label htmlFor="Content">Content</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handlePriorityChange}
                value={priority}
                placeholder="priority"
                required
                type="text"
                name="text"
                id="priority"
                className="form-control align-middle"
              />
              <label htmlFor="Priority">Priority</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleStatusChange}
                value={status}
                placeholder="status"
                required
                type="text"
                name="text"
                id="status"
                className="form-control align-middle"
              />
              <label htmlFor="Status">Status</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleStartDateChange}
                value={start_date}
                placeholder="date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control align-middle"
              />
              <label htmlFor="startdate">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDeadlineChange}
                value={deadline}
                placeholder="date"
                required
                type="date"
                name="date"
                id="date"
                className="form-control align-middle"
              />
              <label htmlFor="deadline">Date</label>
            </div>
            {/* <div className="form-floating mb-3">
              <input
                onChange={handleStickyBoardChange}
                value={stickyBoard}
                placeholder="stickyBoard"
                required
                type="text"
                name="text"
                id="stickyBoard"
                className="form-control align-middle"
              />
              <label htmlFor="StickyBoard">StickyBoard</label>
            </div> */}
            {/* <div className="form-floating mb-3">
              <input
                onChange={handleMemberChange}
                value={members}
                placeholder="members"
                required
                type="text"
                name="text"
                id="members"
                className="form-control align-middle"
              />
              <label htmlFor="Members">Account</label>
            </div> */}
            <div className="d-flex">
              <input
                onChange={handleSearchTermChange}
                value={searchTerm}
                type="text"
                placeholder="Search Member"
              />

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
                            setMembers(
                              members.filter((id) => id !== filteredAccount.id)
                            );
                          }
                        }}
                      />
                      {filteredAccount.last_name}, {filteredAccount.first_name}{" "}
                      <br />
                      {filteredAccount.email} <br />
                    </li>
                  );
                })}
              </ul>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StickyNoteCreateForm;
