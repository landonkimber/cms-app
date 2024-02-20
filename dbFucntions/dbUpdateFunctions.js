const db = require("../config"); // Assuming you have a database module

function updateDBEmployee(employeeData) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?",
            [
                employeeData.first_name,
                employeeData.last_name,
                employeeData.role_id,
                employeeData.manager_id,
                employeeData.id
            ],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    console.log(`
    -----EMPLOYEE UPDATED!-----
      -----ID: ${employeeData.id}
           FIRST NAME: ${employeeData.first_name}
           LAST NAME: ${employeeData.last_name}
           ROLE ID: ${employeeData.role_id}
           MANAGER ID: ${employeeData.manager_id}`);
                    console.log("Employee successfully added!");

                    resolve();
                }
            }
        );
    });
}


module.exports = { updateDBEmployee };