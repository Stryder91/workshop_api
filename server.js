const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const createBoard = require('./services/trello');
const addMembersToABoard = require('./services/trello');

const connectToDrive = require('./services/google_drive/driveLogin');
const createFolder = require('./services/google_drive/drive');
const appendFileToFolder = require('./services/google_drive/drive');
// import { createBoard, addMembersToABoard } from "./services/trello.js";
// import { createFolder, appendFileToFolder } from "./services/google_drive/drive";

app.use(
    express.urlencoded({
      extended: true
    })
);
  
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from milo!');
});

// Test du body qu'on envoie en curl ou autres
app.post('/test', (req, res) => {
    createBoard('Corentin');
    res.send(JSON.stringify(req.body));
});

// Scénario 1 - Création d'un projet
app.post('/project', (req, res) => {
    if (req.body) {
        const data = JSON.stringify(req.body);
        const serviceName = (data.name) ? data.name : null;
        const usersList = (data.users) ? data.users : null;
        const creator = (data.creator) ? data.creator: null;
        
        const services = (data.services) ? data.services : null;
        const lengthService = (services) ? services.length : 0; 
        
        let event = {};

        for (let i=0; i<lengthService; i++) {
            if (services.type == "calendar") {
                // Quelles données il faut pour construire un évènement
                const dateEvt = (services.date) ? services.date : null;
                const heureEvt = (services.heure) ? services.heure : null;
                const dureeEvt = (services.duree) ? services.duree : null;

                // En additionnant l'heure de début avec la durée on obtient l'heure de fins
                const heureFinEvt = parseInt(heureEvt.slice(0,2)) + dureeEvt;

                const descriptionEvt = (services.description) ? services.description : null;   
                
                // Il faut ajouter la durée de l'event sur 'end'.
                event = {
                    'summary': serviceName,
                    'description': descriptionEvt,
                    'start': {
                        'dateTime': dateEvt+'T00:00:00-'+heureEvt,
                        'timeZone': 'Europe/Paris'
                    },
                    'end': {
                        'dateTime': dateEvt+'T00:00:00-'+heureFinEvt,
                        'timeZone': 'Europe/Paris'
                    },
                    'attendees': usersList,
                };
                
                // functionDeMicka(event);
            }
            
            if (services.type == "drive") {
                const isConnected = connectToDrive(process.env.CLIENT_SECRET_GDRIVE_API);
                if (isConnected) {
                    createFolder(serviceName);
                }
            }
        }
        
        console.log("REQ", data);
        res.send(event);
    } else {
        console.log("No body");
    }
});
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});