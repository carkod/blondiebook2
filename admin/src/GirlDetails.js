/* eslint-disable */
import React from 'react';
import classnames from 'classnames';

class GirlDetails extends React.Component {
    
    state = {
        _id: this.props.girl ? this.props.girl._id : null,
        name: this.props.girl ? this.props.girl.name : '',
        city: this.props.girl ? this.props.girl.city : '',
        country: this.props.girl ? this.props.girl.country : '',
        cover: this.props.girl ? this.props.girl.cover : '',
        hide: this.props.girl ? this.props.hide : false,
        errors:[],
        loading: false,
    }

    
    componentWillReceiveProps = (nextProps) => {
     this.setState({
       _id: nextProps.girl._id,
       name: nextProps.girl.name,
       country: nextProps.girl.country,
       city: nextProps.girl.city,
       cover: nextProps.girl.cover,
     });
    }

    handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { _id, name, country, city, cover } = this.state;
        this.props.saveGirl({ _id, name, country, city, cover }).then(() => console.log('successfully updated'))
        /*const { _id, name, country, city, cover } = this.state;
        this.setState({ loading:true});
        console.log(this.props)
        this.props.saveGirl({ _id, name, country, city, cover }).catch((err) => err.json().then(({errors}) => this.setState(  { errors, loading: false })).then(() => console.log('girls details page' + saveGirl))
        )*/
        
    }
    
    render() {
        const renderForm = (
            <form className={classnames( { loading: this.state.loading } ) } onSubmit={this.handleSubmit}>
                <h1>Add New Girl</h1>
                
                {!!this.state.errors && <div className="bg-danger text-danger"><p>{this.state.errors}</p></div>}
                
                <div id="nomeclature" className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                    
                </div>
                
                <div id="geography" className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="city">City</label>
                            <input className="form-control" name="city" id="city" value={this.state.city} onChange={this.handleChange}  />
                            
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="country">Country</label>
                            <input className="form-control" name="country" id="country" value={this.state.country} onChange={this.handleChange }  />
                            
                        </div>
                    </div>
                </div>
                
                <div id="cover" className="form-group">
                    <label htmlFor="cover">Cover URL</label>
                    <input className="form-control" name="cover" id="coverUrl" value={this.state.cover} onChange={this.handleChange} type="cover"/>
                    
                </div>
                
                <div className="form-group">
                    <h3>Image</h3>
                    {!!this.state.cover ?  <img src={this.state.cover} alt="cover" className="img-responsive" width="200"/> : ''}
                    
                </div>
                
                <div className="checkbox">
                    <label>
                    <input type="checkbox" name="hide" value={this.state.hide} onChange={this.handleChange}/> 
                    </label> Hide from web
                </div>
                <button type="submit" className="btn btn-default">Save</button>
            </form>
        );
        
        
        
        return (
            
            <div>
            { renderForm }
            </div>
        );
    }
}

export default GirlDetails;


