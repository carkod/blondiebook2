/* eslint-disable */
import React from 'react';
import classnames from 'classnames';

class GirlDetails extends React.Component {
    
    state = {
        _id: this.props.game ? this.props.game._id : null,
        title: this.props.game ? this.props.game.title : '',
        cover: this.props.game ? this.props.game.cover : '',
        errors:{},
        loading: false,
    }
    
    componentDidMount = () => {
        //console.log(this.props.girls)
    }
    
    componentWillReceiveProps = (nextProps) => {
     this.setState({
       _id: nextProps.game._id,
       title: nextProps.game.title,
       cover: nextProps.game.cover
     });
    }
    
    /*handleChange = (e) => {
        if(!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
        this.setState({
            [e.target.name]: e.target.value,
            errors
        });    
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
        
    }*/
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        /*let errors = {};
        if (this.state.title === '') errors.title = "Can't be empty";
        if (this.state.cover === '') errors.cover = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;
        */
            const { _id, name, country, city, cover } = this.state;
            this.setState({ loading:true});
            this.props.saveGirl({ _id, name, country, city, cover })
            .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false})))
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Add New Girl</h1>
                
                {!!this.state.errors.global && <div className="bg-danger text-danger"><p>{this.state.errors.global}</p></div>}
                
                <div id="title" className="form-group">
                    <label htmlFor="title">Name</label>
                    <input className="form-control" name="title" id="title" value={this.state.name} onChange={this.handleChange}/>
                </div>
                
                <div id="geography" className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="title">City</label>
                            <input className="form-control" name="city" id="city" value={this.state.city} onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="title">Country</label>
                            <input className="form-control" name="country" id="country" value={this.state.country} onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
                
                <div id="cover" className="form-group">
                    <label htmlFor="cover">Cover URL</label>
                    <input className="form-control" name="coverUrl" id="coverUrl" value={this.state.cover} onChange={this.handleChange}/>
                </div>
                
                <div className="form-group">
                    <label>Image</label>
                    {this.state.cover !=='' && <img src={this.state.cover} alt="cover" className="img-responsive"/> }
                    <span>{this.state.errors.cover}</span>
                </div>
                
                <div className="checkbox">
                    <input type="checkbox"/> 
                    <label>Hide from web</label>
                </div>
                <button type="submit" className="btn btn-default">Save</button>
            </form>
        );
    }
}

export default GirlDetails;


