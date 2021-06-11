import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { Component } from 'react';
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import './Category.css';

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            editCategory: null,
            newCategory: null
        };

        this.addCategory = this.addCategory.bind(this)

    }

    componentDidMount() {
        this.updateListCategory()
    };

    updateListCategory() {
        axios.get("/category").then(res => {
            this.setState({
                categories: res.data
            });
        });
    }

    addCategory(e) {
        e.preventDefault();
        axios.post("/category", this.state.newCategory).then(res => {
            let categories = this.state.categories;
            categories.push(res.data)
            this.setState({
                categories: categories
            })
        });
    }

    deleteCategory(id, index) {
        axios.delete("/category/" + id).then(res => {
            let categories = this.state.categories;
            categories.splice(index, 1)
            this.setState({
                categories: categories
            })
        });
    }

    editCategory() {
        var id = this.state.editCategory._id
        axios.patch("/category/" + id, this.state.editCategory).then(res => {
            let categories = this.state.categories;
            let index;
            categories.forEach((e, index1) => {
                if (e._id == id) index = index1
            })
            categories.splice(index, 1, res.data)
            this.setState({
                categories: categories
            })
        });
    }



    preEdit(e, index) {
        this.setState({
            editCategory: this.state.categories[index]
        });
    }

    handleEdit(e) {
        let { name, value } = e.target;

        let newEdit = { ...this.state.editCategory };
        newEdit[name] = value;
        this.setState({
            editCategory: newEdit
        });


    }

    handleNew(e) {
        let { name, value } = e.target;

        let newAdd = { ...this.state.newCategory };
        newAdd[name] = value

        this.setState({
            newCategory: newAdd
        });

    }


    render() {

        const { categories } = this.state
        return (
            <LayoutTableAdmin>
                <div class="category-admin">


                    <h2>Category</h2>
                    <br />
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addCategory"
                        onClick={(e) => this.setState({ newCategory: null })}><i class="fas fa-plus"></i>&ensp;Add Category</button>


                    <table class="table" id="">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {categories.map((category, index) => {

                                return (<tr>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>

                                    <td>
                                        <button type="button" class="btn btn-success " data-toggle="modal" data-target="#editCategory"
                                            onClick={(e) => this.preEdit(e, index)}><i class="far fa-edit"></i></button>
             &ensp;
            <button type="submit" class="btn btn-danger "
                                            onClick={(e) => this.deleteCategory(category._id, index)}><i class="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                )

                            })}

                        </tbody>
                    </table>


                    <div class="modal fade" id="editCategory">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h4 class="modal-title">Edit Product</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body">
                                    <form>

                                        <TextField
                                            id="name"
                                            label="Name"
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                            value={this.state.editCategory?.name}
                                            onChange={this.handleEdit.bind(this)}
                                            autoFocus
                                            margin="normal"
                                        />



                                    </form>


                                </div>

                                <div class="modal-footer">

                                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                                        onClick={this.editCategory.bind(this)}
                                    >
                                        <i class="fa fa-floppy-o" aria-hidden="true"> </i>
                                    </button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                    </div>







                    <div class="modal fade" id="addCategory">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h4 class="modal-title">Add Category</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <form onSubmit={(e) => console.log('ok')}>
                                    <div class="modal-body">

                                        <TextField
                                            id="name"
                                            label="Name"
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                            value={this.state.newCategory?.name || ""}
                                            onChange={this.handleNew.bind(this)}
                                            autoFocus
                                            margin="normal"
                                            required

                                        />
                                    </div>
                                    <div class="modal-footer">

                                        <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={this.addCategory} >Add</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>





                </div>


            </LayoutTableAdmin>


        )
    }
} 
