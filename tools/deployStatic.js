import path from 'path';
import fetch from 'node-fetch';
import { spawn } from './lib/cp';
import { makeDir, moveDir, cleanDir, copyFile,copyDir } from './lib/fs';
import pkg from '../package.json';
import run from './run';

// GitHub Pages
var remote = {
  name: 'origin',
  url: pkg.remoteStaticUrl,
  branch: 'test',
  website: 'http://github.com',
  static: true,
};
const temp = 'tempSTATIC'
const options = {
  cwd: path.resolve(__dirname, `../${temp}`),
  stdio: ['ignore', 'inherit', 'inherit'],
};

/**
 * Deploy the contents of the `/build` folder to a remote server via Git.
 */
async function deploy() {
  // Initialize a new repository
  var branch = process.argv[3] || 'test'
  var cm = process.argv[4] || 'auto deploy' 
  remote.branch = branch
  console.info('部署分支：' + branch)
  if(branch!=='test'&&branch!=='release'&&branch!=='master'){
    console.error('please input the correct branch')
    console.error('failed to deploy')
    return
  }
  console.info('project branch:',remote.branch)
  console.info('start deploy:',cm)
  await makeDir(`${temp}`);
  await spawn('git', ['init', '--quiet'], options);

  // Changing a remote's URL
  let isRemoteExists = false;
  try {
    await spawn(
      'git',
      ['config', '--get', `remote.${remote.name}.url`],
      options,
    );
    isRemoteExists = true;
  } catch (error) {
    /* skip */
  }
  await spawn(
    'git',
    ['remote', isRemoteExists ? 'set-url' : 'add', remote.name, remote.url],
    options,
  );

  // Fetch the remote repository if it exists
  let isRefExists = false;
  try {
    await spawn(
      'git',
      ['ls-remote', '--quiet', '--exit-code', remote.url, remote.branch],
      options,
    );
    isRefExists = true;
  } catch (error) {
    await spawn('git', ['update-ref', '-d', 'HEAD'], options);
  }
  console.info('isRefExists')
  if (isRefExists) {
    await spawn('git', ['fetch', remote.name], options);
    await spawn(
      'git',
      ['reset', `${remote.name}/${remote.branch}`, '--hard'],
      options,
    );
    await spawn('git', ['clean', '--force'], options);
  }

  
  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push('--release');
  if (remote.static) process.argv.push('--static');
  await run(require('./build').default); // eslint-disable-line global-require
  if (process.argv.includes('--static')) {
    await cleanDir('tempSTATIC/*', {
      nosort: true,
      dot: true,
      ignore: ['tempSTATIC/.git'],
    });
    await copyDir('dist/build/', `${temp}`);
  }

  // Push the contents of the build folder to the remote server via Git
  await spawn('git', ['add', '.', '--all'], options);
  try {
    await spawn('git', ['diff', '--cached', '--exit-code', '--quiet'], options);
  } catch (error) {
    await spawn(
      'git',
      ['commit', '--message', `${cm}`],
      options,
    );
  }
  await spawn(
    'git',
    ['push', remote.name, `master:${remote.branch}`, '--set-upstream'],
    options,
  );

  // Check if the site was successfully deployed
  const response = await fetch(remote.website);
  console.info(
    `${remote.website} => ${response.status} ${response.statusText}`,
  );
}

export default deploy;
