import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './commpont/login/index';
import Index from './commpont/index';
import './less/app.less';

class App extends React.Component{
  render (){
    return<div className="App_box">
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/" component={Index}></Route>

              {/* <Route path='/*' exact render={()=>{
                                // 重定向
                                return <Redirect to='/login'></Redirect>
              }}></Route> */}
            </Switch>
    </div>
  };
}

export default App;
