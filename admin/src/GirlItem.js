/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';


export default function GirlItem({ girl }) {
    console.log(girl)
    return(
        <div className="ui card">
        { girl.name }
        { girl.city }
        { girl._id }
            <div className="image">
                {/*<img src={girl.cover} alt="Game Cover"/>*/}
            </div>
            <div className="content">
                <div className="header">{/*girl.title*/}</div>
            </div> 
            <div className="extra content">
         <div className="ui two buttons">
           
           
         </div>
       </div>
        </div>    
    )
}

GirlItem.propTypes = {
    girl: React.PropTypes.object.isRequired,
    //deleteGame: React.PropTypes.func.isRequired
}