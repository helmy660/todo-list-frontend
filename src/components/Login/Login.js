import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import "./Login.css"

export default class Login extends React.Component {
    state = {
        loginFields: {},
        loginErrors: {},
    };
    
    //inputing data for login
    handleChangeLogin(field, e){         
        let loginFields = this.state.loginFields;
        loginFields[field] = e.target.value;        
        this.setState({loginFields});
    }

    handleLoginValidation() {
        let fields = this.state.loginFields;
        let errors = {};
        let formIsValid = true;

        //email validation
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Please enter your email";
        }

        //password validation
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Please enter your password";
        }

        this.setState({loginErrors: errors});
        return formIsValid;
    }


    loginClicked = event => {
        event.preventDefault();
        if(this.handleLoginValidation()) {
            let user = {
                user: {
                    email : this.state.loginFields["email"],
                    password : this.state.loginFields["password"]
                }
            }
            fetch("https://payme-backend.herokuapp.com/login", {
                method: "POST",
                headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(response => {
                        if(response.code === 200) {
                            const user = response.data;
                            localStorage.setItem('user', JSON.stringify(user));
                            this.props.history.push({
                                pathname: '/home',
                                state: { user }
                            })
                        } else {
                            alert("Please enter a valid account or sign up");
                        }
                    })
                } 
                else {
                    alert("bad request, please try again later");
                }
            })
        }
    }

    render() {
        const loginErrors =  this.state.loginErrors;
        return (   
            <Container className="login">
                <h2>Login</h2>
                <Form className="loginForm">
                    <FormGroup row>
                        <Label className="inputLabel" sm={10}>email</Label>
                        <Col sm={{ size: 10, order: 2, offset: 1 }}>
                            <Input 
                                refs="email"                                
                                type="text" 
                                placeholder="Enter Your email"
                                onChange={this.handleChangeLogin.bind(this, "email")} 
                                value={this.state.loginFields["email"]} 
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
                                placeholder="Enter Your Password"
                                onChange={this.handleChangeLogin.bind(this, "password")} 
                                value={this.state.loginFields["password"]}
                            />
                        </Col>
                    </FormGroup>
                    <div className="divider"/>
                    <FormGroup check row>
                        <Col sm={{ size: 3, offset: 4 }}>
                            <Button className="submitForm" onClick = {this.loginClicked}>Login</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <div className="switch">
                  <NavLink tag={Link} to={'/signup'}>Create new account?</NavLink>
                </div> 
                <div className="errors">
                    { Object.keys(loginErrors).map(key => (<div key={key}> Error: {loginErrors[key]}</div>)) }
                </div>
            </Container> 
        );
    }
}