## Ce qu'attend Google Calendar 
```
var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
        'dateTime': '2021-05-22T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'end': {
        'dateTime': '2021-05-22T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
        {'email': 'mickael.chekroun@eemi.com'},
        {'email': 'lionel.tran@eemi.com'}
    ],
    'reminders': {
        'useDefault': false,
        'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10}
        ]
    }
};
```

Mais on peut juste utiliser "summary", "start" et "end".

```
curl -X POST -H "Content-Type: application/json" -d '{
    "name": "coucou", 
    "users":[
        {'email': 'mickael.chekroun@eemi.com'},
        {'email': 'lionel.tran@eemi.com'}
    ],
    "services": [
        {
            "type": "calendar",
            "date": 2021-06-01,
            "heure": 15:30,
            "duree": 4,
            "description" : "event"
        }, 
        {
            "type": "drive",
            "date": 2021-06-01,
            "heure": 15:30,
            "duree": 4,
            "description" : "event"
        }
    ];
    "creator": "creator@gmail.com"}' http://localhost:3000/project
```
