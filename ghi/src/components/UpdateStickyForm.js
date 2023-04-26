import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateStickyForm() {
  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    async function fetchSticky() {
      const response = await fetch(`/api/stickies/${id}`);
      if (response.ok) {
        const sticky = await response.json();
        setSubject(sticky.subject);
        setContent(sticky.content);
        setPriority(sticky.priority);
        setStatus(sticky.status);
        setStartDate(sticky.start_date);
        setDeadline(sticky.deadline);
      } else {
        alert("Error fetching sticky. Please try again.");
      }
    }
    fetchSticky();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/stickies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        content,
        priority,
        status,
        start_date: startDate,
        deadline,
      }),
    });
    if (response.ok) {
      alert("Sticky updated successfully!");
    } else {
      alert("Error updating sticky. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>
      <label>
        Priority:
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          required
        >
          <option value="">--Please choose a priority--</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </label>
      <label>
        Status:
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          required
        >
          <option value="">--Please choose a status--</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
      </label>
      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          required
        />
      </label>
      <button type="submit">Update Sticky</button>
    </form>
  );
}

export default UpdateStickyForm;
