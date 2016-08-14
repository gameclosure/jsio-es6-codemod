'use strict';
const jsio = require('jsio');

// Stolen from: https://github.com/gameclosure/js.io/blob/bf8cdfa2c19fd610b179ce47ca7101f36988c7e9/packages/preprocessors/import.js //
var importExpr = /^(\s*)(import\s+[^=+*"'\r\n;\/]+|from\s+[^=+"'\r\n;\/ ]+\s+import\s+[^=+"'\r\n;\/]+)(;|\/|$)/gm;
var replaceFn = function (raw, p1, p2, p3) {
  if (!/\/\//.test(p1)) {
    return p1 + 'jsio(\'' + p2 + '\')' + p3;
  }
  return raw;
}
// ---- //


// Prime jsio with some common paths
// path: jsio/packages . lib timestep/src
// pathCache: devkit -> devkit-core/src/clientapi
// pathCache: squill -> squill/


module.exports = function(fileInfo, api, options) {
  const j = api.jscodeshift;
  // Transform source so that the AST can be built
  fileInfo.source = fileInfo.source.replace(importExpr, replaceFn);
  const shifted = j(fileInfo.source);

  shifted.find(j.CallExpression, { callee: { name: 'jsio' } })
    .forEach(item => {
      // console.log('item=', item);

      if (item.value.arguments.length !== 1) {
        console.warn('Arguments length is not 1', item.value.arguments.length);
        return;
      }

      const argumentNode = item.value.arguments[0];
      if (argumentNode.type !== 'Literal') {
        console.warn('Argument type not Literal', argumentNode.type);
        return;
      }

      const importString = argumentNode.value;
      console.log('importString=', importString);

      // process.exit(1)
      // return j.identifier();
      // const modulePath = jsio.__util.resolveModulePath();
      const modulePath = 'asdf';

      return j(item).replaceWith(
        j.importDeclaration([], j.literal(modulePath))
      );
    });
  return shifted.toSource();
};
