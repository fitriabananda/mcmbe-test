# mcmbe-test
A simple CRUD API built on Node.js using Express by Express generator, Sequelize for MySQL database connection, and validated with Validator JS.

## Setup
Set up your MySQL connection and create a `.env` file based on `.env-example` with variables values filled in according to your MySQL Server.

```
# install dependencies
$ npm install

# start with debug setting at localhost:3000
$ set DEBUG=test-api:* & npm start
```

## Directories
- `models`: Sequelize models to create tables and columns.
- `routes`: API routes / end points
- `services`: Functions called to interact with database using Sequelize. 

## Database Models
### Student Model
- `id INT(11) not null auto_increment`
- `fullname VARCHAR(255) not null unique`
- `entrance_year INT not null`
- `active_studyplan_id INT`
- `previous_studyplans JSON ARRAY`
### Study Plan Model
- `id INT(11) not null auto_increment`
- `student_id INT(11) not null`
- `year INT not null`
- `period INT not null`
- `courses JSON ARRAY`
- `is_active BOOLEAN`
### Course Model
- `id INT(11) not null auto_increment`
- `name VARCHAR(255)`
- `code VARCHAR(10) not null unique`
- `period_open INT not null`
- `active_students JSON ARRAY` 
## Validations
### Student Model
- `fullname` only allows letters using `isAlpha` validator.

### Study Plan Model
- `courses` has maximum length of 3 as a student can only take 3 courses at a time.

### Course Model
- `code` only allows alphanumeric characters using `isAlphanumeric` validator.
- `active_students` has maximum length of 4 as a course can only have 4 students taking it at a time.

## Endpoints
### Student
`baseURL/student`

`GET` List of Student

`baseURL/student/:id`

`GET` Student by ID

`baseURL/student`

`POST` Create New Student

`baseURL/student/:id`

`PUT` Update Student by ID

`baseURL/student/:id`

`DELETE` Remove Student by ID

`baseURL/student`

`DELETE` Remove Student by attributed at request `body`

### Study Plan
`baseURL/study-plan`

`GET` List of Study Plan

`baseURL/study-plan/:id`

`GET` Study Plan by ID

`baseURL/study-plan`

`POST` Create New Study Plan

`baseURL/study-plan/:id`

`PUT` Update Study Plan by ID

`baseURL/study-plan/:id`

`DELETE` Remove Study Plan by ID

### Course
`baseURL/course`

`GET` List of Course

`baseURL/course/:id`

`GET` Course by ID

`baseURL/course`

`POST` Create New Course

`baseURL/course/:id`

`PUT` Update Course by ID

`baseURL/cocurse/:id`

`DELETE` Remove Course by ID