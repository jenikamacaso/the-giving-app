const path = require('path');

module.exports = {
    compress: false,
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    }
};
