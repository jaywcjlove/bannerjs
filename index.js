var fs = require('fs');
var pkg = require(process.cwd()+'/package.json')

// var banner_str = (
//   '/*!\n' +
//   ' * JSLite JavaScript Library v' + pkg.version + '\n' + 
//   ' * http://JSLite.io\n *\n' + '' +
//     String(fs.readFileSync('./MIT-LICENSE')).trim().split('\n')
//     .map( (l,u) => u==0?` * ${l}`:``).join('') +
//   '\n * Date:' + new Date() +
//   '\n */\n'
// );

function bannersource(){

    var author = pkg.author;
    if (author['name']) {
        author = author.name;
    }

    var homepage = pkg.homepage;
    if(!homepage&&pkg.repository&&pkg.repository.url){
        homepage = pkg.repository.url
    }else if(!homepage){
        homepage = ''
    }

    var description = pkg.description;
    if(!description){
        description = ''
    }

    return {
        author:author,
        homepage:homepage,
        name:pkg.name,
        license:pkg.license,
        version:pkg.version,
        description:description
    }
}

exports.onebanner = function () {
    var bn = bannersource();
    return [ '/*! ', bn.name, ' v', bn.version,
        ' | ', bn.license, ' (c) ',
        new Date().getFullYear(), ' ', bn.author,
        ' | ', bn.homepage,
        ' */',
        ].join('')
};

exports.multibanner = function () {
    var bn = bannersource();
    return (
      '/*!' +
      '\n * '+bn.name+' v' + bn.version + 
      '\n * Copyright'+' (c) ' + new Date().getFullYear() + ' ' + bn.author +
      '\n * Licensed under the '+bn.license+' license.' +
      '\n * ' + 
      '\n * ' + bn.description +
      '\n * ' + bn.homepage  +
      '\n * ' + 
      '\n */\n'
    );
};