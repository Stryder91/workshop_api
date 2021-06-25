# Milo API
**Milo is a solution to create a link on two webservice in automation with a textual command.

This is our public API repo to retrieve commands from Mattermost and to create the logic in order to 
link services between (for example create an event Google Calendar, a Drive folder and a board in Trello at the same time).

So we cut our service in different scenarios and we will be able to create our own customized scenario in a
future release. 


## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Collaboration](#collaboration)
5. [FAQs](#faqs)

### General Info
*
Milo allows you to pick several flowers. This plug-in allows you to automate in your chat mattermost two web-services by notifying your conversation of an event. So you can create a meeting following a survey made on Google form and know the impact of the meeting and the employees who would like to participate. 


## Technologies
*
A list of technologies used within the project:
* [NodeJS](https://nodejs.org/en/blog/release/v14.0.0/): Version 14.0


## Installation
*
A little intro about the installation (we use Nodejs with nodemon and axios)

$ git clone https://github.com/Stryder91/workshop_api
$ cd workshop_api
$ npm install
$ nodemon server.js


## Collaboration
*
In order to collaborate you should visit our [Milo plugin](https://gitlab.eemi.tech/lionel.tran/workshop_plugin)


## FAQs
*
A list of frequently asked questions - 
1. Is this our main repo ?
This is our main API repo, but our plugin is on [Milo plugin](https://gitlab.eemi.tech/lionel.tran/workshop_plugin)

2. How does this API server work
The process is the following :
* The API accepts a text command from the Mattermost chat via outgoing webhooks
* It parses the data and create an event
* Uses the event to trigger the webservices accoring to the type of service requested (Google Calendar for example  )
