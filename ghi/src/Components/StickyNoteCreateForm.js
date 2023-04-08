// import React, { useState, useEffect } from "react";
// import Search_light from "../images/icons/Search_light.svg";
// import sort_icon from "../images/icons/sort_icon.svg";
// import filter_icon from "../images/icons/filter_icon.svg";
// import trash from "../images/icons/trash.svg";
// import pen from "../images/icons/pen.svg";

// //  NEEED TO ADD THE X IN THE TOP RIGHT CORNER!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const StickyNoteCreateForm = (props) => {
//   const [subject, setSubject] = useState(
//   const [category, setCategory] = useState("Default");
//   const [priority, setPriority] = useState("");
//   const [status, setStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [priorityColor, setPriorityColor] = useState("");
//   const [headerColor, setHeaderColor] = useState("");
//   const [bodyColor, setBodyColor] = useState("");

//   const handleSubjectChange = (event) => {
//     const value = event.target.value;
//     setSubject(value);
//   };
//   const handleCategoryChange = (event) => {
//     const value = event.target.value;
//     setCategory(value);
//   };
//   const handlePriorityChange = (event) => {
//     const value = event.target.value;
//     setPriority(value);
//   };
//   const handlePriorityChange = (event) => {
//     const value = event.target.value;
//     setPriority(value);
//   };

//   const handleStartDateChange = (event) => {
//     const value = event.target.value;
//     setStartDate(value);
//   };
//   const handleDeadlineChange = (event) => {
//     const value = event.target.value;
//     setDeadline(value);
//   };
//   //   const handlePriorityColorChange = (event) => {
//   //     const value = event.target.value;
//   //     setPriorityColor(value);
//   //   };
//   const handleHeaderColorChange = (event) => {
//     const value = event.target.value;
//     setHeaderColor(value);
//   };
// //   const handleBodyColorChange = (event) => {
// //     const value = event.target.value;
// //     setBodyColor(value);
// //   };

//   let type = props.type || "Create/Update -> pass in type as prop to set";

//   const handlePriorityColor = (event) => {
//     console.log(priority);
//     setPriority(event.target.value);
//   };
//   useEffect(() => {
//     switch (priority) {
//       case "1":
//         console.log("1");
//         setPriorityColor("bg-gradient-to-l from-[#EFFFF2] to-[#B8FFC3] ");
//         break;
//       case "2":
//         console.log("2");
//         setPriorityColor("bg-gradient-to-l from-[#F5FDFF] to-[#94ECFF]");
//         break;
//       case "3":
//         console.log("3");
//         setPriorityColor("bg-gradient-to-l from-[#FFECEC] to-[#FFCACA]");
//         break;
//       default:
//         console.log("default");
//         setPriorityColor("bg-white");
//     }
//   }, [priority]);

//   const handleBodyColorChange = (event) => {
//     setCategory(event.target.value);
//   };
//   useEffect(() => {
//     switch (category) {
//       case "Backlog":
//         console.log("Backlog");
//         setHeaderColor("bg-sticky_blue_header");
//         setBodyColor("bg-sticky_blue");
//         break;
//       case "Todo":
//         console.log("Todo");

//         setHeaderColor("bg-sticky_red_header");
//         setBodyColor("bg-sticky_red");
//         break;
//       case "Doing":
//         console.log("Doing");

//         setHeaderColor("bg-sticky_yellow_header");
//         setBodyColor("bg-sticky_yellow");
//         break;
//       case "Review":
//         console.log("Review");

//         setHeaderColor("bg-sticky_teal_header");
//         setBodyColor("bg-sticky_teal");
//         break;
//       case "Done":
//         console.log("Done");

//         setHeaderColor("bg-sticky_green_header");
//         setBodyColor("bg-sticky_green");
//         break;
//       default:
//         console.log("Default");
//         setHeaderColor("bg-white");
//         setBodyColor("bg-slate-100");
//     }
//   }, [category]);

// const handleFormSubmit = async (event) => {
//   event.preventDefault();
//   const apiUrl = "http://localhost:8000/sticky";

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//       body: JSON.stringify({
//         category: category,
//         priority: priority,
//         start_date: startDate,
//         deadline: deadline,
//         // priorityColor: priorityColor,
//         // headerColor: headerColor,
//         // bodyColor: bodyColor,
//       }),
//     });
//     console.log(response);
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data); // log the data here
//       // Do whatever you want with the response data here
//     } else {
//       console.log("Sticky note creation failed");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };



//   return (
//     <form className="h-screen w-[100%] flex items-center justify-center absolute z-10">
//       <div className="flex gap-5">
//         <div className="STICKYNOTE w-[37.5rem] h-[39.375rem] ">
//           <div
//             className={`HEADER h-[22%] ${headerColor} rounded-t-[19px] flex flex-col`}
//           >
//             <span className="text-lg p-3 px-4">{type}</span>
//             <div className="flex items-center justify-center gap-20">
//               <select
//                 name=""
//                 id=""
//                 className={`w-[12.8125rem] h-[3.25rem] text-center text-[1.5rem] drop-shadow-sticky ${priorityColor} focus:outline-none`}
//                 required
//                 value={priority}
//                 onChange={handlePriorityColor}
//               >
//                 <option value="">Select Priority</option>
//                 <option type="number" value="3">
//                   High
//                 </option>
//                 <option type="number" value="2">
//                   Medium
//                 </option>
//                 <option type="number" value="1">
//                   Low
//                 </option>
//               </select>
//               <div className="text-[1.2rem]">
//                 <div className="grid grid-cols-calendar items-center">
//                   <span className="">Start</span>
//                   <input
//                     type="date"
//                     className=" bg-transparent focus:outline-none hover:cursor-text w-[90%] "
//                   ></input>
//                 </div>
//                 <div className="grid grid-cols-calendar items-center">
//                   <span>Deadline</span>
//                   <input
//                     type="date"
//                     className="bg-transparent focus:outline-none hover:cursor-text w-[90%]"
//                   ></input>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div
//             className={`BODY h-[78%] ${bodyColor} rounded-b-[19px] flex flex-col`}
//           >
//             <div className="flex item-center justify-center mt-6 gap-20">
//               <div className="SUBJECT-INPUT border-solid border-b-text-dark_mode_text_white border-b-2 mb-[2rem]">
//                 <div className="text-[2rem] flex">
//                   <input
//                     placeholder="SUBJECTTTTT"
//                     className="p-0 m-0 leading-none bg-transparent w-[16rem] placeholder:text-slate-700 focus:outline-none"
//                   />
//                   <img src={pen} className="ml-[.5rem]" />
//                 </div>
//               </div>
//               <select
//                 name=""
//                 id=""
//                 className="CATEGORY-SELECTION inline-block h-[2rem] w-[8.5rem] drop-shadow-sticky text-center focus:outline-none"
//                 required
//                 value={category}
//                 onChange={handleBodyColorChange}
//               >
//                 <option value="Default">Select Category</option>
//                 <option value="Backlog">Backlog</option>
//                 <option value="Todo">Todo</option>
//                 <option value="Doing">Doing</option>
//                 <option value="Review">Review</option>
//                 <option value="Done">Done</option>
//               </select>
//             </div>
//             <textarea className="CONTENT-BOX flex-grow overflow-auto scrollbar-card scrollbar-w-3 text-dark_mode_font focus:outline-none bg-transparent border-solid border-[1px] border-text-dark_mode_text_white resize-none mx-[3.2rem] text-[1.5rem] p-5"></textarea>
//             <div className="BUTTONS flex justify-between m-5 pt-10">
//               <img src={trash} alt="" className="expand-button" />
//               <button
//                 onClick={handleFormSubmit}
//                 className="button-hover-white-filled bg-white px-[1rem] py-[.1rem] rounded-[19px] text-dark_mode_font self-end drop-shadow-sticky"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="MEMBER-LIST w-[20.5625rem] h-[39.375rem] bg-[#CCCCCC] bg-opacity-60 backdrop-blur-[9.3px] rounded-[19px] flex flex-col text-dark_mode_font ">
//           <div className="flex items-center gap-[.5rem] m-5">
//             <div className="SEARCH BAR w-[13.4375rem] h-[2.125rem] bg-white rounded-[19px] flex items-center justify-between px-3 ">
//               <input
//                 placeholder="Search Member"
//                 className="focus:outline-none w-[100%]"
//               ></input>
//               <img src={Search_light} alt="" className="h-[1rem] w-[1rem]" />
//             </div>
//             <div className="FILTER flex gap-[.2rem] items-center expand-button">
//               <img
//                 src={filter_icon}
//                 alt=""
//                 className="h-[.6rem] w-[.56rem] expand-button"
//               />
//               <span className="text-[.8rem]">Filter</span>
//             </div>
//             <div className="SORT flex gap-[.2rem] items-center expand-button">
//               <img src={sort_icon} alt="" className="h-[.6rem] w-[.56rem]" />
//               <span className="text-[.8rem]">Sort</span>
//             </div>
//           </div>
//           <div className="mx-10 h-[75%] flex flex-col text-lg overflow-auto scrollbar-members-list">
//             {/* Use this as the template to create multiple checkbox fields using the maps function */}
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             {/* Everything from here to the next comment is a generation example for the scroll bar. You may delete */}
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             <div className="CHECKBOX-INPUT flex items-center p-1 border-solid border-b-[#000]/25 border-b-2">
//               <input
//                 label="test"
//                 type="checkbox"
//                 value="Account"
//                 className="mr-2"
//               />
//               <label htmlFor="test" className="flex flex-col">
//                 <span>Name</span> <span>Email</span>
//               </label>
//             </div>
//             {/* Everything from here to the previous comment is a generation example for the scroll bar. You may delete */}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default StickyNoteCreateForm;
import React, { useState } from "react";

function StickyNoteCreateForm({ props }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [start_date, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [stickyBoard, setStickyBoard] = useState("");
  const [account, setAccount] = useState([""]);

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

  const handleStickyBoardChange = (event) => {
    const value = event.target.value;
    setStickyBoard(value);
  };

  const handleAccountChange = (event) => {
    const value = event.target.value;
    setAccount(value);
  };

  // const filteredAccounts = props.accounts.filter((account) =>
  // account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  // account.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );



const handleSubmit = async (event) => {
  event.preventDefault();
  const data = {};
    data.subject = subject;
    data.content = content;
    data.priority = parseInt(priority);
    data.category = status;
    data.start_date = new Date(start_date + "T00:00:00.00").toISOString();
    data.deadline = new Date(deadline + "T00:00:00.00").toISOString();
    data.stickyBoard = stickyBoard;
    data.account = account;


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
            <div className="form-floating mb-3">
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
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAccountChange}
                value={account}
                placeholder="account"
                required
                type="text"
                name="text"
                id="account"
                className="form-control align-middle"
              />
              <label htmlFor="Account">Account</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StickyNoteCreateForm;
