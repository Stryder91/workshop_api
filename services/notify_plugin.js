// Ce fichier va permettre de notifier le plugin Mattermost des actions effectués par le serveur d'API.
// sous forme de webhook entrants
const axios = require('axios').default;

module.exports = function notifyPlugin(msg) {
    axios.post(process.env.URL_MATTERMOST_HOOK+process.env.TOKEN_MATTERMOST_HOOK, {
        msg
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
}
