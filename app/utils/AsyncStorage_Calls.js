import AsyncStorage from '@react-native-async-storage/async-storage';


var ASO = function () { };

ASO.prototype.setTokenJWT = function (key, value, callBack) {

    AsyncStorage.setItem('AdsReel$:' + key, JSON.stringify(value), (err) => {
        if (err) {
            callBack('Error setting token', false);
        }
        else {
            callBack(null, true);
            console.log("rohith QIN")
        }
    });
};



ASO.prototype.getTokenJWT = function (key, callBack) {
    AsyncStorage.getItem('AdsReel$:' + key, (err, result) => {
        if (err) {
            callBack('Error getting token', null);
        } else {
            callBack(null, result ? JSON.parse(result) : null);
        }
    });
};




ASO.prototype.RemoveTokenJWT = function (key, callBack) {
    console.log("Loging", key)
    AsyncStorage.removeItem('AdsReel$:' + key, (err, resp) => {
        if (err)
            callBack('Error fetching token', false);
        else {
            callBack('Error fetching token', true);
            console.log("dsfvs")
        }
        // callBack(JSON.parse(resp), true);+
        
    });
};



export default new ASO();
