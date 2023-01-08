const provider = require('qrcode')

class DataProvider {
    
    constructor(_provider) {
        this.provider = _provider;
        this.keystore = [];
    };

    provide(_key) {
        let url;
        provider.toString(_key, function (err, _url) {
            url = _url;
        });
        return url;
    };

    store() {
        return this.keystore;
    };

    display(_index, _urls) {
        console.log(`   \u2713 Generated QR using link << ${_urls[_index]} >>`);
        console.log(this.keystore[_index]);
    };
};

const generator = new DataProvider(provider);
module.exports = { generator };
