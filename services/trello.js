// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
const key = 'ec9831db2e4b337a39978869ad329976';
const token = '5c07397ce3e96338d34ca0cc04a8c3c8b825feede2f161d1d9f5eaf1dba325d0';
const baseAPI = 'https://api.trello.com/1';

/**
 * Create a board on trello.com
 * @param {String} name  The name to dedicate to the board
 */
function createBoard(name) {
	var callURL = baseAPI + '/boards/?key=' + key + '&token=' + token + '&name=' + name;
	fetch(callURL, {
		method: 'POST'
	})
	.then(response => {
		return response.text();
	})
}

/**
 * Add members to a board
 * @param {String} boardName The name of the board to add members
 * @param {Array} membersList List of members to add
 */
function addMembersToABoard(boardName, membersList){
	var answer;
	memberList.forEach((member, index) => {
    	var callURL = baseAPI + '/boards/' + boardName + '/members/' + member['id'];
    	fetch(callURL, {
    		method: 'PUT'
    	})
    	.then(response => {
    		answer.push(response.text());
    	})
   	})
   	return answer;
}

module.exports = {
    createBoard: createBoard,
    addMembersToABoard: addMembersToABoard
}