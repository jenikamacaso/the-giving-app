const path = require('path');

module.exports = {
    compress: true,
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    }
};


///webpack.config.js
// vendor: [
//         .....
//         'xlsx',
//         'file-saver'
// ],
// .....
// node: {fs: 'empty'},
// externals: [
//     {'./cptable': 'var cptable'},
//     {'./jszip': 'jszip'}
//  ]
