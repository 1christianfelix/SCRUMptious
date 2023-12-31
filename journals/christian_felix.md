# 3-20-23

- Group Assignment
- Sticky Note Scrum Idea
- Ideation

# 3-21-23

- Wireframing pages
- First Figma Mockup created
  ![alt](./christian_felix_images/3-21%20mockup.png)

# 3-22-23

- Wireframing models

# 3-23-23

- Wireframing continued
- Database choice discussion

# 3-24-23

- MongoDB model planning
- Wireframing continued

# 3-25-23

- Mockup v2 started

# 3-26-23

- Mockup v2 completed (https://www.figma.com/proto/htMVuimTHiSIxo3SgaHR9n/Untitled?node-id=0%3A1)
  ![alt](./christian_felix_images/3-26%20Sidebar-Sticky-initDash-UX.gif)
  - Created Sidebar and Sticky note component using tailwind and react components
  - Started Tailwind styling guide

# 3-27-23

- Mockup v2 touch up
- API endpoint discussion
- User/Develoepr Issues started

# 3-28-23

- FrontEnd, Backend, UI/UX issues created

# 3-29-23

- Experimented with Merge Request
- More issues created
- Highlighted frontend issues
- Created Sticky Board Cards and styled with Tailwind
- Tweaked the Sticky Note component style
  ![alt](./christian_felix_images/3-30%20Sidebar-Sticky-initDash-UX.gif)

# 3-30-23

- Merge Requests Handled
- Stretch Goal Planning
- Delegating weekend Issues

# 3-31-23

- Created PUT query operation for Sticky boards
- Create Route for GET by ID for a sticky board
- Designed the logic for generating Sticky Notes in the front end
  ![alt](./christian_felix_images/3-31-Implementing-%20Frontend-sticky-note-logic.gif)

# 4-01-23

- New color palettes planned

# 4-03-23

- Worked and completed the Account Auth as a team
- Created the Sign up page. Did UX/UI work on it (form not submittable)
  ![alt](./christian_felix_images/4-03-SignUp%20page%20UIUX.gif)

# 4-04-23

- Created the Sign in page UI/UX and form layout (not submittable)
- Created the Form layout UI/UX for creating/updating stickyboards
  ![alt](./christian_felix_images/4-04-StickyBoard%20Form%20UIUX.gif)

# 4-05-23

- Created the Form layout UI/UX for creating/updating stickynotes
  ![alt](./christian_felix_images/4-05-StickyNote%20Form%20UIUX.gif)

# 4-06-23

- Protected endpoints
- Implemented drag and drop functionality
- Partially worked on Stickyboards page
  ![alt](./christian_felix_images/4-06-StickyNote%20Drag%20and%20Drop%20logic%20UIUX.gif)

# 4-07-23

- Finished Stickyboards page UI/UX
- Team discussion on remodelling our database to support drag and drop
  ![alt](./christian_felix_images/4-07-StickyBoards%20list%20page%20UIUX.gif)

# 4-08-23

- Implemented Restful top-level/dependent relationship for creating a sticky note on a specific stickyboarc
- Working to finish Stickyboard page UI/UX and refactor drag and drop logic for future handling function implementations
- Managed to setup logic for sticky note components to represent draggable items while changing colors upon being dropped into new locations
- New discussion regarding a color field or finding way to update the category field for sticky notes
  ![alt](./christian_felix_images/4-08-Creating%20sticky%20and%20stickyboard%20top-level%20relationship%20endpoint.gif)
  ![alt](./christian_felix_images/4-08%20Drag%20and%20Drop%20logic%20for%20stickynote%20and%20recoloring.gif)

# 4-09-23

- Refactored frontend auth logic for app.js and index.js by adding an alias environment in the docker-compose.yaml to represent the url found in the login function from jwtdown-for-react
- Used jwtdown-for-react to refactor current login handling function
- app.js set up to only show the login if there is no session token active
- logout button added to sidebar and will take user back to signin page upon logging out
  ![alt](./christian_felix_images/4-09%20Frontend%20auth%20set%20up%20for%20login%20and%20logout.gif)

# 4-10-23

- Refactored the drag and drop logic on stickyboard to now use our Sticky Note component
- Created generation functions to mimic the database inorder to test sticky note movements
- Continued to stylize the UI/UX
  ![alt](./christian_felix_images/4-10%20Drag%20and%20Drop%20logic%20for%20stickynote%20and%20recoloring.gif)

# 4-11-23

- Added buttons for generating sticky notes to the top of columns for testing purposes
- implemented a scrollbar in each column to prevent page overflow when the amount of stickies in a column exceeds the page height
- Refactored the generation button to bring up a sticky note form instead
- The sticky note form now acts like a modal upon clicking the generation button
- The background becomes unfocus during the modal pop up. clicking create/X/background exits the modal
- Spent time figuring out how to center the grid representing the droppable columns considering the scroll bar taking up space.

# 4-12-23

- Had to remove the expand button functionality from the sticky note and apply it to the sticky note on the actual sticky dashboard instead
  - Initially trying to call the sticky note form caused visual issues at the modal did not render in the center of the dashboard
  - Moving the button to the dashboard page as a sibiling to the sticky note and using absolute positioning solved the issue
- Added another sticky note generation button to the bottom of the columns for more accessability options.
- Completed the header UI/UX components

  - Drop down for member's stickyboard and a filtering section for priority!

  ![alt](./christian_felix_images/4-12%20Stickyboard%20page%20UIUX%20frontend%20functioning.gif)

# 4-16-23

- Added modal form pop ups for sticky board creation and edit buttons.
  - Creating modals in tailwind requires you to pass down states from the parent component to the modal that indicates wheter to render null or render JSX
- Devised a plan to maintain a category field on sticky notes in order to reflect color changes on the frontend when dragging stickies between columns
  - Beautiful-dnd allows us to give ID's to each column. We will use those ID's to to designate the value for the proposed category field.

# 4-17-23

- Refactored sticky models to now use a category field.
  - The value of this field will determine the placement of the note object into the appropriate list fields in the stickyboard it belongs to
- Worked on getting Bradon's branch debugged
- Worked with Kurt to debug parts of the create form for stickies and merge main into his working branch

# 4-18-23

- Created new endpoint to fetch a list of stickies per stickyboard that contains the details of each sticky note
- Implemented logic to get the stickynotes of a board through path parameters
- Incorporated the backend data to use in the front end by pulling the stickynotes of the list categories from the stickyboard.
- Persisted the data in the backend when dropping and dragging into other categories by submitting the shape of the array to PUT endpoint for the stickyboard

# 4-19-23

- Implemented the StickyNote create form into the stickyboard page
  - Creating a StickyNote by using the '+' will place the stickynote at the front of the list
  - Creating a stickyNote by using the "add" at the bottom will place the stickynote at the bottom of the list
- Implemented the StickyBoard create/update forms into the stickyboards page and the delete functionality

![alt](./christian_felix_images/4-19%20Sticky%20notes%20can%20be%20appened%20to%20top%20or%20bottom%20and%20category%20selected%20automatically%20becomes%20default%20choice.gif)

# 4-20-23

- Started Deployment with team.
- Worked on redesigning the Update/Create forms for stickyboards to have a description field

![alt](./christian_felix_images/4-20%20stickyboard%20form%20UIUX%20updates.jpg)

# 4-21-23

- Fixed bugs with the stickyboard create form not reseting its fields upon cancelling
- Fixed bugs with the stickyboard update form to reset priority fields.

# 4-24-23

- Cleaned up the JS files to comply with lint.

# 4-25-23

- Helped group members with merging main into their branches and experimented with refactoring App.js to tackle a CORS error that triggers upon reload despite a 200 response
- Continued develop new UI/UX theme
- Started progress on Readme with a layout and endpoints

# 4-26-23

- Fixed the CORS bug with the help of Rosheen. We had misinput the CORS_HOST value in caprover.
- Replaced all local host with SERVICE_HOST name and debugged minor console errors
- Helped merge all major issues into main
- Worked on implementing All current features into the new UIUX
- Added tooltips to various buttons
- Added dragging functionality to stickyboards
- Added navigation features to sidebar buttons

# 4-27-23

- Encountered deployment console errors upon merging new UI
- Fixed those errors by recommenting in the BASENAME and DEPLOY variables in index.js
- Fixed UI issues with the Account modal not disappearing.
- Confirmation our 404 error was common. Moved on from it.
- Setup the Design Concept portion in Readme
