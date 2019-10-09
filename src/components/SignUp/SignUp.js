import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import "../Login/Login.css";

export default class SignUp extends React.Component {
    state = {
        signUpFields: {},
        signUpErrors: {}
    };

    //inputing data for signup
    handleChangeSignUp(field, e){         
        let signUpFields = this.state.signUpFields;
        signUpFields[field] = e.target.value;        
        this.setState({signUpFields});
    }


    handleSignUpValidation(){
        let fields = this.state.signUpFields;
        let errors = {};
        let formIsValid = true;
    
        //userName validation
        if(!fields["userName"]){
           formIsValid = false;
           errors["userName"] = "userName cannot be empty";
        }
    
        // Email validation
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email cannot be empty";
        }
    
        // Email format validation
        if(typeof fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Please enter valid email";
          }
        }
    
        // image validation
        if(!fields["imageURL"]){
          formIsValid = false;
          errors["imageURL"] = "imageURL can't be empty";
        }
    
        // password validation
        if((!fields["password"]) || (fields["password"].length < 8)){
          formIsValid = false;
          errors["password"] = "Password must be at least 8 characters";
        }
    
        // confirm password validation
        if( fields["confirmPassword"] !== fields["password"]){
          formIsValid = false;
          errors["confirmPassword"] = "Please confirm password correctlly";
        }
       
        this.setState({signUpErrors: errors});
        return formIsValid;
    }

    signUpClicked = event => {
        event.preventDefault();
        this.refs.signbtn.setAttribute("disabled", "disabled");
        if(this.handleSignUpValidation()) {
          let user = {
            user: {
              userName: this.state.signUpFields["userName"],
              password: this.state.signUpFields["password"],
              email: this.state.signUpFields["email"],
              imageURL: this.state.signUpFields["imageURL"]
            }
          };
          fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          })
          .then(res => {
            if (res.ok) {
              res.json().then(response => {
                if(response.code === 200) {
                  alert("Successfully Created an account ... Welcome to Todo List");
                  this.props.history.push({
                    pathname: '/todo',
                    state: { user: response.data }
                  })
                } else {
                  alert("userName or email is already existed !");
                }
              });
            } else {
              alert("bad request, please try again later");
            }
          })
        }
    };


    render() {
        const signUpErrors =  this.state.signUpErrors;
        return (                 
            <Container className="login">
                <h2>Sign Up</h2>
                <Form className="loginForm">
                    <FormGroup row>
                        <Label className="inputLabel" sm={10}>userName</Label>
                        <Col sm={10}>
                            <Input 
                                refs="userName"
                                type="text" 
                                placeholder="Enter Your userName"
                                onChange={this.handleChangeSignUp.bind(this, "userName")} 
                                value={this.state.signUpFields["userName"]}
                            />
                        </Col>
                    </FormGroup>
                    <div className="divider"/>
                    <FormGroup row>
                        <Label className="inputLabel" sm={10}>email</Label>
                        <Col sm={10}>
                            <Input 
                                refs="email"                                
                                type="text" 
                                placeholder="Enter Your email"
                                onChange={this.handleChangeSignUp.bind(this, "email")} 
                                value={this.state.signUpFields["email"]} 
                            />
                        </Col>
                    </FormGroup>
                    <div className="divider"/>
                    <FormGroup row>
                        <Label className="inputLabel" sm={10}>image URL</Label>
                        <Col sm={10}>
                            <Input 
                                refs="imageURL"
                                type="text" 
                                placeholder="Enter Your image URL"
                                onChange={this.handleChangeSignUp.bind(this, "imageURL")} 
                                value={this.state.signUpFields["imageURL"]} 
                            />
                        </Col>
                    </FormGroup>
                    <div className="divider"/>
                    <FormGroup row>
                        <Label className="inputLabel" sm={10}>Password</Label>
                        <Col sm={10}>
                            <Input 
                                refs="password"                                 
                                type="password" 
                                placeholder="Enter Valid Password"
                                onChange={this.handleChangeSignUp.bind(this, "password")} 
                                value={this.state.signUpFields["password"]}
                            />
                        </Col>
                    </FormGroup>
                    <div className="divider"/>
                    <FormGroup row>
                        <Label className="inputLabel" sm={10}>Confirm Password</Label>
                        <Col sm={10}>
                            <Input 
                                refs="confirmPassword"                                 
                                type="confirmPassword" 
                                placeholder="Confirm Password"
                                onChange={this.handleChangeSignUp.bind(this, "confirmPassword")} 
                                value={this.state.signUpFields["confirmPassword"]}
                            />
                        </Col>
                    </FormGroup>
                    <div className="divider"/>
                    <FormGroup check row>
                        <Col sm={{ size: 3, offset: 4 }}>
                            <Button 
                                refs="signBtn"
                                className="submitForm" 
                                onClick = {this.signUpClicked}>Sign Up
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div className="errors">
                    { Object.keys(signUpErrors).map(key => (<div key={key}> Error: {signUpErrors[key]}</div>)) }
                </div>
            </Container>
        );
    }
}