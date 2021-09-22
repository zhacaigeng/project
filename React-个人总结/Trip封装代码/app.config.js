
/** convention higer than config
 *  comment rule ? not necessary or necessary
 *  type bool number string etc
 *  config instructions
 */


let os = require('os');
let fs = require('fs');

let env= '';
let envConfig= require('./package.json').config.env
try {

    if (os.platform() == 'linux') {
        try{
            let results = {}
            let path_url = '/opt/settings/server.properties';
            var sererConfig = fs.readFileSync(path_url);

            sererConfig.toString().replace(/^(.*?)=(.*?)$/gm, function (_, key, value) {
                if (key.toLowerCase() === 'subenv') {
                    value = value.replace(/[^(A-Za-z0-9)]/g, '')
                }
                results[key.toLowerCase()] = value;
            });
            env = results['env'].toLowerCase();
        }catch(e){
            env = '';
        }

    }

    if(!env){
        let envMap = {
            'FWS': 'fws',
            'FAT': 'fws',
            'LPT': 'lpt',
            'UAT': 'uat',
            'PROD':'prod'
        };
        env = envMap[envConfig.toUpperCase()]
    }else if(env.toLowerCase()=="fat"){
        env = "fws"
    }

}catch(e){
    env = 'prod'
}



// Export configuration
module.exports  = {
    ///<!--Expression generation area, please do not modify-->
    // appId-start
    AppID: "100030714",
// appId-end
    ///<!--Expression generation area, please do not modify-->
    Env: env
}