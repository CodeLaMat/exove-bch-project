## Employees

```
{
   "employees": [
      {
         "id": "",
         "firstName": "",
         "surname": "",
         "email": "",
         "displayName": "",
         "personal":
         {
            "age": 0,
            "gender": ""
            },
         "about":
         {
            "bio": ""
            },
            "work": {
               "reportsTo": {
                  "id": "0",
                  "firstName": "",
                  "surname": "",
                  "email": ""
                  },
                  "title": "",
                  "department": "",
                  "site": "",
                  "startDate": "2015-06-01"
                  "role": ""
                  "points": {
                     "category1": 0,
                     "category2": 0,
                     "category3": 0,
                     "category4": 0,
                     "category5": 0,
                     "category6": 0,
                     "category7": 0,
                  }
                  }
                  },
                  {
                  }]}
```

## Questions

````
{
  "questions": [
    {
      "category": "",
      "questions": [
        {
          "question_1": "",
          "isFreeForm": false,
        },
        {
          "question_2": "",
          "isFreeForm": false,
        },
        {
          "question_3": "",
          "isFreeForm": false,
        },
        {
          "question_4": "",
          "isFreeForm": false,
        },
        {
          "question_5": "",
          "isFreeForm": false,
        },
        {
          "question_6": "",
          "isFreeForm": true,
        }
      ]
    },
    {}]}
    ```

````

{
"users": [
{
"work": {
"reportsTo": "642b0545fc13ae2c01f4cf80"
},
"_id": "642d20b9477db2115844a24b",
"firstName": "Bibbye",
"surName": "Gwyn",
"email": "bgwyn4@clickbank.net",
"password": "LspPqs8R6x",
"title": "Automation Specialist III",
"department": "Accounting",
"site": "Baishuitan",
"startDate": "2019-04-06T07:36:40.000Z",
"role": "employee",
"image": "fileName.svg",
"__v": 0
},
{
"work": {
"reportsTo": "642b0545fc13ae2c01f4cf81"
},
"_id": "642d20b9477db2115844a24c",
"firstName": "Winn",
"surName": "Phelipeaux",
"email": "wphelipeaux5@unesco.org",
"password": "5xivJLHUXo1B",
"title": "Administrative Officer",
"department": "Research and Development",
"site": "Citeureup",
"startDate": "2019-10-02T04:53:47.000Z",
"role": "employee",
"image": "fileName.svg",
"__v": 0
},]}

[
[
{
"work": {
"reportsTo": "642b0545fc13ae2c01f4cf80"
},
"_id": "642d20b9477db2115844a24b",
"firstName": "Bibbye",
"surName": "Gwyn",
"email": "bgwyn4@clickbank.net",
"password": "LspPqs8R6x",
"title": "Automation Specialist III",
"department": "Accounting",
"site": "Baishuitan",
"startDate": "2019-04-06T07:36:40.000Z",
"role": "employee",
"image": "fileName.svg",
"__v": 0
},
{
"work": {
"reportsTo": "642b0545fc13ae2c01f4cf81"
},
"_id": "642d20b9477db2115844a24c",
"firstName": "Winn",
"surName": "Phelipeaux",
"email": "wphelipeaux5@unesco.org",
"password": "5xivJLHUXo1B",
"title": "Administrative Officer",
"department": "Research and Development",
"site": "Citeureup",
"startDate": "2019-10-02T04:53:47.000Z",
"role": "employee",
"image": "fileName.svg",
"__v": 0
},]]

const user = userData[0];
const FullName = user.name.join(" ");
const nameArray = FullName.split(" ");
const firstName = nameArray[0];
const lastName = nameArray[1];
const role = user.role.join("");
