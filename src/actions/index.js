import * as AppAction from './AppActions'
import * as BatchAction from './BatchActions'
import * as settingAction from './settingActions'
import * as homeAction from './HomeActions'

const actions = {
  ...AppAction,
  ...BatchAction,
  ...settingAction,
  ...homeAction
}
export default actions
