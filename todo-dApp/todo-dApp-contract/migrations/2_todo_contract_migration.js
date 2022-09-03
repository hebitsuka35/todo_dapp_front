// 2_todo_contract_migration.js
const TodoContract = artifacts.require("TodoContract");

module.exports = function (deployer) {
    deployer.deploy(TodoContract);
};