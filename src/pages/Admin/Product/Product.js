import React, { useState, useEffect } from 'react';
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import axios from 'axios';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CKEditor from "ckeditor4-react";
import {
    Card, CardHeader, CardBody,
    FormGroup, Label, Input,
    Form, Row, Col
} from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function convertStringLong(string) {
    if (string.length > 93) {
        let clone = string.slice(0, 93)
        return clone.concat('...')
    }
    else return string
}

function Product(props) {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [newProduct, setNewProduct] = useState(null)
    const [editProduct, setEditProduct] = useState(null)
    const [formData, setFormData] = useState(null)


    useEffect(() => {
        axios.get('/product')
            .then(res => {
                console.table(res.data)
                setProducts(res.data)
            })


    }, [])

    useEffect(() => {
        axios.get('/category')
            .then(res => {
                console.table(res.data)
                setCategories(res.data)
            })


    }, [])

    function handleNew(e) {
        let { name } = e.target;
        let value = e.target.files ? e.target.files[0] : e.target.value
        let add = { ...newProduct };
        add[name] = value
        setNewProduct(add)

    }

    function handleAddDescription(e) {
        let add = { ...newProduct };
        add.description = e.editor.getData();
        setNewProduct(add)


    }


    function convertFormData(data) {
        let formDataNew = new FormData()
        Object.keys(data).forEach((key) => {
            formDataNew.append(key, data[key]);
            // console.log(key + "=" + data[key])

        })
        console.log("x", data)
        console.log("y", formDataNew)
        return formDataNew
    }

    function preAdd() {
        setNewProduct(null)
        if (categories && categories.length > 0)
            setNewProduct({ category: categories[0]._id })
    }

    function addProduct() {
        console.table(newProduct);
        let preForm = convertFormData(newProduct);
        axios.post("/product", preForm)
            .then(res => {
                let productsNew = [...products];
                productsNew.push(res.data)
                setProducts(productsNew)
                toast.success('thêm sản phẩm thành công')
            })
            .catch(err => {
                toast.error('thêm sản phẩm thất bại')
            })

        console.table(newProduct)
    }

    function deleteProduct(index, product) {
        axios.delete(`/product/${product._id}`)
            .then(res => {
                let productsNew = [...products]
                productsNew.splice(index, 1)
                setProducts(productsNew)
                toast.success('xoá thành công')
            })
            .catch(err => {
                toast.error('xoá sản phẩm thất bại')
            })
    }




    function handleEditDescription(e) {
        let add = { ...newProduct };
        add.description = e.editor.getData();
        setNewProduct(add)

    }

    function handleEdit(e) {
        let { name } = e.target;
        let value = e.target.files ? e.target.files[0] : e.target.value
        let edit = { ...editProduct };
        edit[name] = value
        setEditProduct(edit)

    }


    function preEdit(index) {
        let currentProduct = { ...products[index] };
        if (currentProduct.category._id) currentProduct.category = currentProduct.category._id
        setEditProduct(currentProduct)

    }

    function onEditProduct() {
        let cloneEditProduct = { ...editProduct }
        const index = products.findIndex(product => product._id === editProduct._id)
        console.log('index', index)
        let preForm = convertFormData(cloneEditProduct);
        axios.patch(`/product/${cloneEditProduct._id}`, preForm)
            .then(res => {
                let productsNew = [...products];
                console.log("a", productsNew)
                console.log("b", res.data)
                productsNew.splice(index, 1, res.data)
                setProducts(productsNew)
                toast.success('sửa sản phẩm thành công')
            })
            .catch(err => {
                toast.error('sửa sản phẩm thất bại')
            })

        console.table(cloneEditProduct)
        console.log('category hiện tại', categories.find((e) => e._id == cloneEditProduct.category))
    }





    return (
        <>
            <LayoutTableAdmin>
                <ToastContainer />

                <div class="product-admin">


                    <h2>Sản phẩm</h2>
                    <br />
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addProduct"
                        onClick={(e) => preAdd()}><i class="fas fa-plus"></i>&ensp;Thêm sản phẩm</button>

                    <div className="card">
                        <table class="table table-hover " id="">
                            <thead>
                                <tr className="">
                                    <th>ID</th>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    {/* <th>Description</th> */}
                                    <th>Mô tả sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((product, index) => {

                                    return (<tr className="row-table-custom">
                                        <td>{index}</td>
                                        <td>

                                            <a href={`/product/${product._id}`}><img src={product.imgUrl} width={64} height={64} /></a>

                                        </td>
                                        <td>{product.name}</td>
                                        {/* <td><a href="">Detail</a></td> */}
                                        <td width={400}>{convertStringLong(product.summary)}</td>

                                        <td>{(product.price)}</td>
                                        <td>
                                            <form class="form-group" >
                                                <button type="button" class="btn btn-success mr-2" data-toggle="modal" data-target="#editProduct"
                                                    onClick={(e) => preEdit(index)}><i class="far fa-edit"></i></button>
                                                <button type="button" class="btn btn-danger"
                                                    onClick={(e) => deleteProduct(index, product)}><i class="far fa-trash-alt"></i></button>
                                            </form>
                                        </td>
                                    </tr>
                                    )

                                })}

                            </tbody>

                        </table>


                    </div>

                </div>


            </LayoutTableAdmin>



            <div class="modal fade" id="addProduct">

                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Thêm sản phẩm</h4>
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
                                    value={newProduct?.name || ""}
                                    onChange={handleNew}
                                    autoFocus
                                    margin="normal"
                                />

                                <TextField
                                    id="price"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={newProduct?.price || ""}
                                    onChange={handleNew}
                                    margin="normal"
                                />

                                <TextField
                                    id="summary"
                                    label="Summary"
                                    name="summary"
                                    multiline
                                    rowsMax={4}
                                    variant="outlined"
                                    fullWidth
                                    value={newProduct?.summary || ""}
                                    onChange={handleNew}
                                    margin="normal"
                                />

                                <div class="form-group">
                                    <label for="category">Category:</label>
                                    <select class="form-control" id="category" name="category"
                                        onChange={handleNew}
                                        value={newProduct?.category}
                                    >
                                        {categories.map((category, index) => (<option value={category._id} >{category.name}</option>))}

                                    </select>
                                </div>


                                <FormGroup>
                                    <Label for="imgUrl">Chọn Ảnh</Label>
                                    <Input
                                        onChange={handleNew}
                                        type="file" name="imgUrl"
                                        placeholder="chọn ảnh" />
                                </FormGroup>





                                <label htmlFor="contained-button-file">
                                    Description
				        <CKEditor data={newProduct?.description || ""} name="description" onChange={handleAddDescription} />
                                </label>

                            </form>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={addProduct} data-dismiss="modal">Add</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>



            <div class="modal fade" id="editProduct">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Product</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            {editProduct &&
                                <form>

                                    <TextField
                                        id="name"
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        value={editProduct.name}
                                        onChange={handleEdit}
                                        autoFocus
                                        margin="normal"
                                    />

                                    <TextField
                                        id="price"
                                        label="Price"
                                        name="price"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        value={editProduct.price}
                                        onChange={handleEdit}
                                        margin="normal"
                                    />

                                    <TextField
                                        id="summary"
                                        label="Summary"
                                        name="summary"
                                        multiline
                                        rowsMax={4}
                                        variant="outlined"
                                        fullWidth
                                        value={editProduct.summary}
                                        onChange={handleEdit}
                                        margin="normal"
                                    />

                                    <div class="form-group">
                                        <label for="category">Category:</label>
                                        <select class="form-control" id="category" name="category"
                                            onChange={handleEdit}
                                            value={editProduct?.category || editProduct?.category._id}
                                        >
                                            {categories.map((category, index) => (<option value={category._id} >{category.name}</option>))}

                                        </select>
                                    </div>





                                    <FormGroup>
                                        <Label for="imgUrl">Chọn Ảnh</Label>
                                        <Input
                                            onChange={handleEdit}
                                            type="file" name="imgUrl"
                                            placeholder="chọn ảnh" />
                                    </FormGroup>
                                    <label htmlFor="contained-button-file">
                                        Description
				                <CKEditor name="description" data={editProduct?.description || null} onChange={handleEditDescription} />
                                    </label>
                                </form>
                            }


                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={onEditProduct} data-dismiss="modal"><i class="far fa-save"></i>&ensp;Save</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>



        </>
    );
}

export default Product;