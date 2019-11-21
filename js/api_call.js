document.addEventListener("DOMContentLoaded", run);
var brewList = [];

function run() {
 let breweries;  
 let data = axios
            .get("https://api.openbrewerydb.org/breweries")
            .then(brews => {

                brewList = brews.data;

                let list = brewList.map(b => `<li>name: ${b.name} state:   city:</li>`);

            }).catch(e => {
                console.log(e.error);
            });
}