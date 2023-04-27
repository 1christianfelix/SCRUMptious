#### 4/27/23
- Work on the readme and journal.
- Conversation regarding the issues left.
#### 4/26/23
- Work on filtering sticky based on priority (Issue #88);
- Work on switching stickyboards on the sticy view page and its stickies (as well as the address) will be changed accordingly. By clicking the "go back" button, the previous page will be shown and the address will be changed.
- Work on unit test for post a stickyboard (Issue #89).
- Fix bugs; clean up files
- Conversation regarding the issues to be worked on; reviewing current works
#### 4/25/23
- Work on unit test for getting all stickyboards and posting a stickyboard
- Work on deployment.
- Fix bugs
- Work on the sticky update and deletion.
- Conversation regarding the issues to be worked on; reviewing current works
#### 4/24/23
- Work on unit test for getting all stickyboards.
- Work on deployment.
- Conversation regarding the issues to be worked on; reviewing current works
#### 4/20/23
- Work on unit test for getting all stickyboards.
- Work on deployment.
#### 4/19/23
- Work on frontend for stickyboard update.
- Work on unit test
- Work on sending email via sendgrid
#### 4/18/23
- Work on frontend for stickyboard list view and stickyboard creation, update and deletion.
- Conversation regarding the issues to be worked on.
#### 4/17/23
- Work with Brandon for while updating sticky’s category, the sticky’s id will be removed from/appended to the corresponding category under the stickyboard.
- Work on stickyboard list view page.
- Work on registering gmail, sendgrid and Hotmail account.
- Conversation regarding registering a gmail account.
#### 4/15/23
- Work on unit test for get all stickyboards.
#### 4/14/23
- Work on sending email reminder via sendgrid api for someone is added into a stickyboard/sticky at its creation.
#### 4/13/23
- Revise the POST function of sticky so that when creating a sticky, its id will be added into the corresponding category of stickyboard.
#### 4/7/23
- Update the PUT function of stickyboard to be able to update one or more field only, instead of needing all the fields (for the drag and drop function).
- Update the model/field of stickyboard and sticky.
- Conversation regarding changing the model/field of stickyboard and sticky.
#### 4/6/23
- Work on stickyboard create form with CSS.
- Work on front-end auth.
- Conversation regarding the frontend auth.
#### 4/5/23
- Work on stickyboard create form; make the search function for accounts
- add/remove members of the stickyboard through check/uncheck checkbox.
- Update the GET all account functions to sort accounts by the last name and then the first name.
- Conversation regarding (1) having password confirmation on the sign up page; (2) sorting account data at the back-end.
#### 4/4/23
- Work on stickyboard create form.
- Conversation regarding the procedures for merge request.
#### 4/3/23
- Work on authentication (backend).
- Set up list all accounts (GET) function in FastAPI.
- Set up delete an account (DELETE) function in FastAPI.
- Remove queries.client.py in FastAPI and make corresponding changes in queries.account.py for setting up database connection.
- Update the field of sticky and stickyboard from user to account.
- Update the code and api address in app.js in React for the change from user to account.
- It’s great to have a team.
#### 3/30/23
- Set up stickyboard create form in React to add one or more user; set up the user info fetching in app.js of react.
- Research on showing different content for each user.
- Work on authentication (backend).
- Conversation regarding showing different content for each user. Conclusion: That’s for stretch goal.
#### 3/29/28
- Fix the bugs for GET stickies under a stickyboard (Issue #9) and DELETE of a stickyboard (Issue #4).
- Figure out the how to make one to many relationship for user via reference (making the user as a list).
- Conversation regarding assignment of tasks for backend.
- MongoDB can make user as foreign key just using a list.
#### 3/28/23
- Complete stickyboard’s POST (Issue #1), GET all (Issue #7), GET stickies under the stickyboard (Issue #9) and DELETE functions (Issue #4).
- Complete sticky’s POST (Issue #2) and GET all functions (Issue #26).
- Create issues as far as we can think of.
- Conversation regarding creating issues.
#### 3/27/23
- Work on stickyboard’s POST (Issue #1), GET all (Issue #7), GET stickies under the stickyboard (Issue #9) and DELETE functions (Issue #4).
- Work on sticky’s POST (Issue #2) and GET all functions (Issue #26).
- Set up environment for MongoDB and Mongo-Express (Issue #13); Update docker yaml file.
- Conversation regarding whether to proceed with MongoDB or switch to sql db.
- FastAPI + MongoDB is very fast and no more migrations.
