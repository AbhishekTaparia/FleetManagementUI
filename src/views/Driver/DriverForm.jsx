import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { connect } from  'react-redux';
import { addDriver } from '../../actions/index';
import axiox from 'axios';
import URL from '../../actions/index'
//import ImageLoader from 'react-image-file'


import { Card } from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

class Form2 extends Component{

    
    renderInputField(field){

        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="text"
            {...field.input}
            hint="qwee"
            className="form-control"
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }
    
      renderInputDateField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="date"
            {...field.input}
            className="form-control"
            required
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }

      renderInputImageField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="file"
            
//            onChange={this.fileChangedHandler}
            />
            <button onClick={this.uploadHandler}>Upload</button>
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )  
      }

      

      renderInputFloatField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`
    
        return(
          <div className={className}>
            <label>{field.myLabel}</label>
            <input 
            type="number"
            {...field.input}
            hint="789456123"
            className="form-control"
            />
            <div className="error">
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
      }

    onSubmit(values){
        this.props.addDriver(values,()=>{
          this.props.history.push('/')
        })
    }

    
    render(){
        return(
          <Card
            title="Driver"
            content={
              <div className="Form" >
                    <div className="top">
                        
                        <Link to="/driverdisplay">Display</Link>
                    </div>
            
                        <div className="content" id="left">
                            <form onSubmit={this.props.handleSubmit((event)=>this.onSubmit(event))}>
                            <Field
                                myLabel="Driver ID"
                                name="did"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Driver Name"
                                name="dname"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Joining Date"
                                name="joining_date"
                                component={this.renderInputDateField}
                            />
                            <Field
                                myLabel="Adhaar Card No"
                                name="id_proof"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Address"
                                name="address"
                                component={this.renderInputField}
                            />
                            <Field
                                myLabel="Mobile no"
                                name="mobile_no"
                                component={this.renderInputFloatField}
                            />
                            <Field
                                myLabel="Driving License No"
                                name="license_no"
                                component={this.renderInputFloatField}
                            />
                            <div>
                              <label>Photo :</label>
                              <ImageUpload name="photo" driverid="did"/>
                            </div>
                            <div><label></label></div>
                            
                            
                            <Button bsStyle="info" pullRight fill type="submit">
                          Submit
                        </Button>
                            </form>
                            
                        </div>
              </div>
            }
             />   
        )
    }
}

function validate(values){
    console.log("validate")
    const errors = {}
  
    if(!values.company_name){
      errors.company_name = "Enter Company name"
    }
  
    if(!values.contact){
      errors.contact = "Enter you name"
    }
  
    if(!values.address){
      errors.address = "Enter a address"
    }
  
    if(!values.owner_name){
        errors.owner_name = "Enter owner's name"
    }

    return errors;
  }

function mapStateToProps(state){
    console.log(state)
    return {
      success:state.data
    }
  }
  
  export default reduxForm({
    validate,
    form:'PostDriver'
  })(
    connect(mapStateToProps,{addDriver})(Form2)
  )








  class ImageUpload extends React.Component {
    state={
      selectedFile:null
    }
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: '',default1:[]};
    }
  
componentDidMount(){
  let self = this;
  axiox.get(`${URL}/drivers/${this.props.driverid}/${this.props.name}`)
        .then(res=>{
          let source='data:image/jpeg;base64,'+res.data
          this.setState({default1:source})
          setTimeout(() => {
            
          }, 2000);
          
        });
        //console.log(this.state.default1)
}

    _handleSubmit(e) {
      e.preventDefault();
      // const fd= new FormData();
      // fd.append('image',this.state.file,this.state.file.name);
      // TODO: do something with -> this.state.file
      //console.log('handle uploading-', this.state.file);
      axiox.post(`${URL}/${this.props.driverid}/${this.props.name}`,this.state.file)
        .then(res =>{
          console.log(res)
        });
        
    }
  
    _handleImageChange(evt) {
      // e.preventDefault();
  
      // let reader = new FileReader();
      // let file = e.target.files[0];
  
      // reader.onloadend = () => {
      //   this.setState({
      //     file: file,
      //     imagePreviewUrl: reader.result
      //   });
      // }
  
      // reader.readAsDataURL(file)
      console.log("Uploading");
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];
      //var file=this.state.default1;
  
      reader.onload = function(upload) {
          self.setState({
            file:file,
              imagePreviewUrl: upload.target.result
          });
      };
      reader.readAsDataURL(file);
      console.log(this.state.imagePreviewUrl);
      console.log("Uploaded");
    }
  
    
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} width='100px' height='75px'/>);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
          {console.log("value")}
          <input ref="file" type="file" name="file" 
                                className="upload-file" 
                                id="file"
                                onChange={(e)=>this._handleImageChange(e)} 
                                //encType="multipart/form-data" 
                                required/>
            {/* <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} /> */}
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
            
            
          </div>
        </div>
      )
    }
  }
  


  