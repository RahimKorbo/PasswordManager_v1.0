import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { addRecordURL, register } from "./Constants";
import Spinner from 'react-bootstrap/Spinner';
import loading from'../assets/loading.gif';
import { addRecord } from "./PasswordDataCall";

export default class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      fields: {},
      isLoading: false,
      errors: {},
      userName: props.location.state.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);

  }

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submitLoginForm(e) {
    e.preventDefault();
    //alert("Form submitted---->", this.validateForm());
    let fields = this.state.fields;

    // if (this.validateForm()) {

    //   if (!fields["username"] && !fields["password"] && !fields["username"] && !fields["password"]) {
    //     fields["username"] = "";
    //     fields["password"] = "";
    //   }


    // }

    this.setState({ fields: fields });
    //alert("Form submitted");
    this.authenticate();

  }

  validateForm() {

    let formIsValid = true;
    let fields = this.state.fields;
    let errors = {};


    // alert("UserName:::" + fields.userName);
    // alert("Password:::" + fields.userPass);


    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    // if (typeof fields["username"] !== "undefined") {
    //   if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["username"] = "*Please enter alphabet characters only.";
    //   }
    // }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (!fields["userpin"]) {
      formIsValid = false;
      errors["userpin"] = "*Please enter your userpin.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }

  authenticate = () => {
    // firstname
    // Laste
    // email
    // username
    // userpass

    // userpin 4-6

    this.setState({ isLoading: true });
    
    const authJson = {

        siteName: this.state.fields.siteName,
        sitePwd: this.state.fields.sitePwd,
        siteUserName: this.state.fields.siteUserName
    };

    console.log("data gone to api-", authJson);
   
    // alert("Spinner chalu--"+this.state.isLoading);
    addRecord(authJson).then(res=>{
        console.log(res)
        
        if(res.status===200){
          alert(res.data);
          this.setState({
            isPosted:true
          })
        }
        else{
          alert("Error Occurred")
        }
      })

  };

  render() {
    const { isPosted } = this.state;

    // here is the important part

    // firstname
    // Laste
    // email
    // username
    // userpass
    // userpin 4-6

    if (isPosted) {
      return <Redirect to={{ pathname: '/dashboard',state: { id: this.state.userName } }} push={true} />;
    }

    return (



      <div>
        <div className="login">
          <h1>Password Manager</h1>
          <h1>Hello {this.state.userName} Add New Record</h1>
          <p><input
            id="siteName"
            name="siteName"
            type="text"
            placeholder="siteName"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>
          <p><input
            id="sitePwd"
            name="sitePwd"
            type="text"
            placeholder="sitePwd"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>
          <p><input
            id="siteUserName"
            name="siteUserName"
            type="text"
            placeholder="siteUserName"
            onKeyUp={this.handleChange}
            required
            maxLength="8"
          /></p>


          <p className="submit"> <button
            role="button"
            className="button"
            //onClick={this.authenticate}
            onClick={this.submitLoginForm}
          >
            Add
                        </button></p>

                        {this.state.isLoading && <img src={loading} />  }
        </div>


       

      </div>
    );
  }
}
