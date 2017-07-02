/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';


export default function GirlItem({ girl, deleteGirl, copyGirl }) {
    
    const { _id, name, city, country, cover, createdAt, modifiedAt } = girl;
    
    return(
        <div className="col-md-3">
        <div className="thumbnail">
        {!!cover ? <img src={cover} alt={name} className="img-responsive img-rounded"/> : '' }
        <div className="caption">
            <h2>{ name }</h2>
            <p className="well well-sm"><small className="glyphicon glyphicon-time">Created: { createdAt } &middot; Last modified: { modifiedAt }</small></p>

            <p><strong>{ city }</strong>, { country }</p>
            <p>
                <Link to={`/bk/${_id}`} className="btn btn-primary" role="button">Edit</Link>
                &nbsp;
                <a className="btn btn-danger" role="button" onClick={() => deleteGirl(_id)}>Delete</a>
                &nbsp;
                <a onClick={() => copyGirl(girl)} className="btn btn-warning" role="button">Copy</a>
            </p>
            
       </div>
    </div> 
    </div>
    )
}