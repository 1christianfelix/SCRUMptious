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
