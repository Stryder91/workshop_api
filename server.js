const express = require('express');
const app = express();
const port = 3000;

app.use(
    express.urlencoded({
      extended: true
    })
);
  
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from milo!');
});

app.post('/test', (req, res) => {
    res.send(JSON.stringify(req.body));
});

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
                // On crée un drive
            }
            
            if (services.type == "git") {
                // On crée un repo git
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