**Steps to set up the project**

1. Run the "npm install" command. It will automatically install all the necessary requirements like mysql2, express, and sequelize
2. Update the Mysql DB connection in the "models/Task.js" file.
3. If the table is not created, it will automatically create a table.
4. Run the command "node app.js" to start the server.
5. Use the project with Postman API's.


**Example of Create API**:
```
curl --location 'http://localhost:3000/tasks/' \
--header 'Content-Type: application/json' \
--data '{
    "title":"Task 1",
    "description":"demo task",
    "status":"Done",
    "timeline":"12/11/1981"
}'
```
