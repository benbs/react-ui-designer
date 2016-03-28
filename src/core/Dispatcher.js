/**
 * Created by Ben on 2/14/2016.
 */
import {Dispatcher} from 'flux';
import * as config from '../config';

let dispatcher = Object.assign(new Dispatcher(), {
  dispatch: function(action) {
    if (config.showDispathLogs) {
      console.log("DISPATCH", action.type, action);
    }
    Dispatcher.prototype.dispatch.call(this, action);
  }
});

export default dispatcher;
