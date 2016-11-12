var fs = require('fs');
var assign = require('object-assign');
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
    if (author&&author['name']) {
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

    var license = pkg.license
    if(!license){
      license = ''
    }else if(license&&license.type){
      license = license.type
    }

    return {
        author:author,
        homepage:homepage,
        name:pkg.name,
        license:license,
        version:pkg.version,
        description:description
    }
}

exports.onebanner = function (option) {
    var bn = bannersource();
    if(option) bn = assign(bn,option);
    return [ '/*! ', bn.name, ' v', bn.version,
        ' | ', bn.license, ' (c) ',
        new Date().getFullYear(), ' ', bn.author,
        ' | ', bn.homepage,
        ' */',
        ].join('')
};

exports.multibanner = function (option) {
    var bn = bannersource();
    if(option) bn = assign(bn,option);
    return (
      '/*!' +
      '\n * ' + bn.name+' v' + bn.version + 
      '\n * ' + bn.description +
      '\n * ' + 
      '\n * Copyright' + ' (c) ' + new Date().getFullYear() + ' ' + bn.author +
      '\n * ' + bn.homepage  +
      '\n * ' + 
      '\n * Licensed under the '+bn.license+' license.' +
      '\n */\n'
    );
};