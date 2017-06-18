/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';


export default function GirlItem({ girl, deleteGirl, copyGirl }) {
    
    const { name, city, country, cover } = girl;
    
    return(
        <div className="col-md-4">
        <div className="thumbnail">
        {!!girl.cover ? <img src={girl.cover} alt={girl.name} className="img-responsive img-rounded"/> : '' }
        <div className="caption">
            <h2>{ girl.name }</h2>
            <p><small>{ girl.city }</small>, { girl.country }</p>
            <p>
                <Link to={`/bk/${girl._id}`} className="btn btn-primary" role="button">Edit</Link>
                &nbsp;
                <a className="btn btn-danger" role="button" onClick={() => deleteGirl(girl._id)}>Delete</a>
                &nbsp;
                <a onClick={() => copyGirl(girl)} className="btn btn-warning" role="button">Copy</a>
            </p>
            
       </div>
    </div> 
    </div>
    )
}