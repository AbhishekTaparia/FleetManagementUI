import React,{Component} from 'react';
import logo from "../../assets/img/logoFull.png"
class Main extends Component{
    render(){
        return(
            <div className="text-center">
                <img src={logo} width="90%" padding="42px" height="75%" />
            </div>
        )        
    }
}

export default Main;