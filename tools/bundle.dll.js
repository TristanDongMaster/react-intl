/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';
import webpackConfig from '../config/webpack.config.dll';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      const start = new Date();
      if (err) {
        console.info(
          `[${format(start)}] Build failed ...`,
        );
        return reject(err);
      }
      console.info(stats.toString({
        colors: true,
        reasons: false,
        timings: true,
      }));
      console.info( `[${format(start)}] Build succeed ...`)
      if (stats.hasErrors()) {
        return reject(new Error('Webpack compilation errors'));
      }

      return resolve();
    });
  });
}

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}


export default bundle;
