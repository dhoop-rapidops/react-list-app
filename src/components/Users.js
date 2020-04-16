import React, { Component } from "react";
import shortId from "shortid";

const User = (props) => {
    const { user } = props;
    return (
        <tr>
            <td> {user.firstName} </td>
            <td> {user.lastName} </td>
            <td><button className="btn btn-info" onClick={props.editHandler.bind(this, user._id, user.firstName, user.lastName)} >Edit</button> <button onClick={props.deleteHandler.bind(this, user._id)} className="btn btn-danger">Delete</button></td>
        </tr>
    );
}

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: 'Add',
            _id: '',
            firstName: '',
            lastName: '',
            users: []
        }
    }

    firstnameChanged = (e) => {
        this.setState({
            firstName: e.target.value
        });
    }

    lastnameChanged = (e) => {
        this.setState({
            lastName: e.target.value
        });
    }

    onAddOrUpdate = (e) => {
        e.preventDefault();
        if (this.state.status === "Add") {
            if (this.state.firstName && this.state.lastName) {
                this.setState(prevState => ({
                    users: [...prevState.users, {
                        _id: shortId.generate(),
                        firstName: this.state.firstName,
                        lastName: this.state.lastName
                    }],
                    firstName: '',
                    lastName: ''
                }));
            } else {
                alert("Please fill out all the fields");
            }
        } else if (this.state.status === "Update") {

            const { users } = this.state;
            const index = users.findIndex(user => user._id === this.state._id);
            users[index].firstName = this.state.firstName;
            users[index].lastName = this.state.lastName;

            this.setState({
                status: 'Add',
                firstName: '',
                lastName: '',
                users: users
            });
        }
    }

    onEditUser = (_id, firstName, lastName) => {
        this.setState({
            _id: _id,
            firstName: firstName,
            lastName: lastName,
            status: 'Update'
        });
    }

    onDeleteUser = (_id) => {
        const { users } = this.state;
        const index = users.findIndex(user => user._id === _id);
        users.splice(index, 1);
        this.setState({
           users: users
        });
    }

    render = () => {
        let { users, firstName, lastName, status } = this.state;
        return (
            <div className="container">
                <div className="d-flex justify-content-center m-3 p-2 sep">
                    <form className="form-inline">
                        <input type="text" onChange={this.firstnameChanged} value={firstName} className="form-control mb-2 mr-sm-2" placeholder="Enter Firstname" />
                        <input type="text" onChange={this.lastnameChanged} value={lastName} className="form-control mb-2 mr-sm-2" placeholder="Enter Lastname" />
                        <button className="btn btn-primary mb-2 mr-sm-2" onClick={this.onAddOrUpdate}>{status}</button>
                    </form>
                </div>
                {users.length > 0 &&
                    <div className="p-2 m-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => <User key={user._id} user={user} editHandler={this.onEditUser} deleteHandler={this.onDeleteUser} />)
                                }
                            </tbody>
                        </table>
                    </div>
                }

            </div>
        );
    }
}

export default Users;