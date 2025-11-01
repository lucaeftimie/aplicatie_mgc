#!/bin/bash

echo "Deleting tables..."
curl -s -X DELETE http://localhost:3005/admin/droptables | jq

echo "Creating tables..."
curl -s -X POST http://localhost:3005/admin/createtables | jq

echo "Adding constraints..."
curl -s -X PATCH http://localhost:3005/admin/addconstraints | jq

echo "Inserting data..."
curl -s -X POST http://localhost:3005/admin/insertdata | jq

echo "Updating data..."
curl -s -X PATCH http://localhost:3005/admin/updatedata | jq

# echo "Deleting data..."
# curl -s -X DELETE http://localhost:3005/admin/deletedata | jq
