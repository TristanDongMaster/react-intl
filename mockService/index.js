
// home
let projectList = require('./home.js');

// common 
let checkSystemManagerService = require('./common/checkSystemManagerService.js');

let data = [
  // common 
  checkSystemManagerService,

  // home 
  projectList,

];

function getApiData(api) {
  let r = data.filter(item => {
    if (api.indexOf(item.api) > -1) {
      return true;
    }
  });
  if (r && r.length) {
    return r[0].response;
  } else {
    return {
      code: 500,
      data: {},
      msg: '无匹配api'
    };
  }
}

module.exports = getApiData;
//module.exports = data
