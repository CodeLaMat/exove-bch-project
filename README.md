# Employee Feedback App

## Description

The Employee Feedback App aims to assist the HR team in collecting feedback from employees about their coworkers. With unique role-based access control, the application streamlines the feedback collection process and provides insightful dashboards for HR, Managers, and Employees.

### Process Flow:

- **HR/Admin Control:** They can create surveys, question categories, and questions. They also select employees to be evaluated and nominate survey takers.
- **Employee Role:** An employee can accept the participants nominated or request changes.
- **Manager Role:** Managers can be part of a survey, view, and approve its results.
- **Result Viewing:** Once approved by a manager, HR can view reports, generate them in PDF, and archive for future reference.

Notifications are sent to users upon each status change, ensuring everyone stays updated.

## Technologies

- **Frontend:** REACT, TypeScript, JavaScript, HTML, CSS.
- **Backend:** Node.js, JavaScript, JWT, Express, MongoDB, LDAP.

## Features

- Facilitates the HR team in collecting authentic feedback.
- Streamlines the survey process.
- Provides role-based dashboards with relevant insights.

## Installation and Setup

1. Clone the repository.
2. Install the required node packages using `npm install`.
3. Configure the Docker and LDAP server as per requirements. Configuration files can be found in the project.

## Usage

- **LDAP Server Access:**
  - **Login:** cn=admin,dc=test,dc=com
  - **Password:** myadminpassword.

More details about user roles and login credentials can be found within the application.

## GIF presentation

<img src="https://raw.githubusercontent.com/CodeLaMat/exove-bch-project/tree/main/frontend/src/assets/Video/Media1.gif" width="480" height="270" alt="Gif presentation" />

## GIF presentation

<img src="/frontend/src/assets/Video/Media1.gif" width="480" height="270" alt="Gif presentation" />
