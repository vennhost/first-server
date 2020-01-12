/*

    Students Portfolio Repo

    You are in charge of creating a Student Portfolio Repo for both Frontend and Backend.

    In this first "step" the application should enable the creation, editing, deletion, listing of students.

    Student should have this information:
    - Name
    - Surname
    - ID
    - Email
    - Date of Birth

    //BACKEND

    You are in charge of building the Backend using NodeJS only. The backend should include the following routes:

    GET /students => returns the list of students
    GET /students/123 => returns a single student
    POST /students => create a new student
    PUT /students/123 => edit the student with the given id
    DELETE /students/123 => delete the student with the given id

    The persistence must be granted via file system (es.: Json file with a list of students inside)

    [EXTRA] POST /checkEmail => check if another student has the same email. The parameter should be passed in the body
    It should not be possible to add a new student if another has the same email.


    //FRONTEND

    You are in charge of building the Frontend too. Use ReactJS to create an application for managing the students.

    The features for the application are:

    - Add a new Student ([EXTRA]use CheckEmail before sending the post to the backend)
    - Show Students on a list
    - Every Student could be edit or deleted

*/


/* 
    Upgrade Students Portfolio Project
    //BACKEND
    - Add validation with Validator package --> https://www.npmjs.com/package/validator:
    explore the documentation and try to experiment as many validation methods as possible.
    - Add PATCH route:
    PATCH /students/:id => edit the student with the given id, this route should contain a list of fields for which updates are allowed.
    If req.body contains a field not in the white list --> res.status(400).send('Invalid updates!')
    - Upgrade GET /students route by returning students + totalStudents, number of all the students in the collection (I mean ALL)
    - Add Sort, Skip, Limit to route GET /students/:
    Client should have the possibility to call the route and set as query parameters sort, skip, limit. Skip and limit are numbers, sort is a string
    containing the field to sort in descending order. [EXTRA] Try to send also the preference for ascending or descending order.
    //FRONTEND
    In past homework you focused on backend stuff leaving out frontend. Today go and complete previous homework's features.
    [EXTRA] Add pagination to students list --> add page numbers buttons to the list and do a little math. How many pages do you need to display 10 students
    per page? How could I use skip and limit from the backend to correctly use serverside pagination?
*/