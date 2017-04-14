let rollup = require('rollup'),
    buble = require('rollup-plugin-buble'),
    uglify = require('uglify-js'),
    path = require('path'),
    fs = require('fs'),
    zlib = require('zlib');

const resolve = _path => path.resolve(__dirname, '../', _path)

build([
  // browser dev
  {
    dest:resolve('dist/vue-router-title.js'),
    format:'umd',
    env:'development'
  },
  {
    dest:resolve('dist/vue-router-title.min.js'),
    format:'umd',
    env:'production'
  },
  {
    dest:resolve('dist/vue-router-title.common.js'),
    format:'cjs'
  },
  {
    dest:resolve('dist/vue-router-title.esm.js'),
    format:'es'
  }
].map(genConfig))

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }
  next()
}

function genConfig (opts) {
  const config = {
    entry:path.resolve(__dirname, '../src/index.js'),
    dest:opts.dest,
    format:opts.format,
    moduleName:'VueRouterTitle',
    plugins:[
      buble()
    ]
  }

  return config
}

function buildEntry (config) {
  const isProd = /min\.js$/.test(config.dest)
  return rollup.rollup(config).then(bundle => {
    const code = bundle.generate(config).code
    if (isProd) {
      let minified = uglify.minify(code, {
        fromString:true,
        output:{
          screw_ie8:true,
          ascii_only:true
        },
        compress:{
          pure_funcs:['makeMap']
        }
      }).code
      return write(config.dest, minified, true)
    } else {
      return write(config.dest, code)
    }
  })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}