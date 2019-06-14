import React from 'react';




class Login extends React.Component {
    constructor (props) {

        super(props);
        this.state={
            user:{
                username:"",
                age: null,
                email:"",
                password:"",
            },



        }
    }

    sendAuth =(e) => {
        e.preventDefault();//!!важно иначе зацикливается
        console.log("sendAuth username: ",this.state.username," ,pass: ",this.state.password,
            " ,email: ",this.state.email," ,age: ",this.state.age);
        var data = 'username=' + encodeURIComponent(this.state.username)// тут без это  & хрени
            + '&password=' + encodeURIComponent(this.state.password)+'&email=' + encodeURIComponent(this.state.email)+
            '&age=' + encodeURIComponent(this.state.age);//каждый следуюющий надо отделять & - вот такой херней
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/addData',true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send(data);
        xhr.onload = () => {
            if (xhr.readyState === xhr.DONE) {
                console.log('UP xhr: ',xhr);
                if (xhr.status === 200) {
                    console.log('UP xhr.response: ',xhr.response);
                }
            }
        };
        return false;//!!тоже важно иначе зацикливается
    };
    handleChange =(e)=> {
        this.setState({ [e.target.name]: e.target.value });
    };
    getUsers = (e)=> {
        e.preventDefault();//!!важно иначе зацикливается
        var data = db.getCollection("users");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/getData',true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        console.log(data);
        xhr.send(data);
    }
    render() {

    return (
        <div>
            <h2>Please, log in</h2>
            <form onSubmit={this.sendAuth}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="username" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Age</label>
                    <input type="text" className="form-control" name="age" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email</label>
                    <input type="text" className="form-control" name="email" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                </div>
                <button>Log in</button>
            </form>

            <h2>Users table</h2>
            <button onClick={()=>this.getUsers}>Get users</button>
            <div className="usersTable">
                <div className="usersTableHeader">
                    <div>User name</div>
                    <div>User age</div>
                    <div>User email</div>
                    <div>User password</div>
                </div>
                <div className="usersTableContent">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>

    )
}


}
export  default Login;
