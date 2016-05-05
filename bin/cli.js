#!/usr/bin/env node


var read = require('fs').createReadStream
var write = require('fs').createWriteStream

var banner = require('../')

var args = process.argv.slice(2)
var help = false
var multi = false
var one = false

args = args.filter(function (arg) {
  if (arg === '-h' || arg === '--help') {
    help = true
    return false
  } else if (arg === '-m' || arg === '--multi') {
    multi = true
    return false
  } else if (arg === '-o' || arg === '--one') {
    one = true
    return false
  }
  return true
})


if (help){

    console.log('Usage: bannerjs')
    console.log('')
    console.log('Pipe Usage: bannerjs')
    console.log('')
    console.log('Options:')
    console.log('')
    console.log(' -m --multi     Output multi-line results')
    console.log(' -o --one       Output one-line results')
    console.log('')
    if (!help) process.exit(1)

}else {

    var banner_str = '';

    if(multi){
        banner_str = banner.multibanner()
    }else{
        banner_str = banner.onebanner()
    }


    var dest = args[2] ? write(args[2]) : process.stdout
    var source = args[1] ? read(args[1]) : process.stdin

    dest.write(banner_str+'\n')
    source.on('end', function () {
        dest.write('\n')
    }).pipe(dest, {end: false})
}