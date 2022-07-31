/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf(conf) {
  // make sure my-ext boot file is registered
  conf.boot.push(
    "~quasar-app-extension-rasello-user-management/src/boot/service.js"
  );
  conf.boot.push(
    "~quasar-app-extension-rasello-user-management/src/boot/register.js"
  );

  // make sure boot & component files get transpiled
  conf.build.transpileDependencies.push(
    /quasar-app-extension-my-component[\\/]src/
  );

  // we push to /quasar.conf.js > framework > plugins:
  conf.framework.plugins.push("AppVisibility");

  conf.preFetch = true;

  console.log(
    "App Extension (rasello-user-management) Info: 'Adding rasello-user-management boot reference to your quasar.conf.js'"
  );
}

module.exports = function(api) {
  api.extendQuasarConf(extendConf);
};
