import React, { useState } from 'react';
import './BookMarkNow.css'
import { useFormik } from 'formik'
import { Link, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';
import Footer from '../Footer/Footer';
import back from '../../back.png'
import plus from '../../plus.png'

const BookMarkNow = ({ email, bookmarkdata, category }) => {
    const usermail = email
    const [status, setStatus] = useState(false)
    const [categoryValue, setCategoryValue] = useState([])
    const [count, setCount] = useState(false)
    const [showCat, setShowCat] = useState(true)
    const [newCat, setNewCat] = useState(false)
    const [existingCat, setExistingCat] = useState('')
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const formik = useFormik({
        initialValues: {
            email: usermail,
            category: '',
            sitelink: '',
            sitename: '',
            checkbox: [],
        },
        onSubmit: (values) => {
            setLoading(false)
            const newCategory = new FormData()
            if (values.category) {
                newCategory.append('category', values.category)
            } else {
                categoryValue.map((value) =>
                    newCategory.append('category', value)
                )

            }
            console.log(categoryValue)
            newCategory.append('email', usermail)
            newCategory.append('sitename', values.sitename)
            newCategory.append('sitelink', values.sitelink)
            fetch('http://qikdaw.com:5000/bookmark', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify(newCategory)
                body: newCategory
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data) {

                        console.log('true')
                        window.location.reload(true);
                        // window.location.reload(true);
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        },
        validate: (values) => {
            let errors = {};
            if (!categoryValue) {
                if (!values.category) {
                    errors.category = 'Required'
                }
            }
            return errors

        }
    })


    const handleClicked = () => {
        setNewCat(true)
        setCount(true)
    }
    const CatArr = []
    let key = 0
    bookmarkdata.map((x, id) => {
        CatArr.push(x.category)
        key = id
    })
    const catArr = []
    function onChange(checkedValues) {
        setCategoryValue(checkedValues)
    }

    return (
        <div style={{ minHeight: '75vh' }}>
            { loading ?
                <div >
                    <div className='px-5'>
                        <div className='d-flex flex-wrap justify-content-between align-items-center mb-3 text-center px-3 py-2' style={{ cursor: 'pointer', width: '200px', border: '3px solid #C64CE9', borderRadius: '30px' }} >
                            <h5 className='text-muted text-center'>BOOKMARK</h5>
                            <div>
                                <img style={{ width: '40px' }} src={plus} alt="" />
                            </div>
                        </div>
                        <div style={{ borderBottom: '3px solid lightgrey' }}>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} >
                        <div>
                            {newCat == false ?
                                <div>
                                    <div className='d-flex flex-wrap justify-content-center mt-4'>
                                        <div className='col-12 col-lg-1 mb-5' style={{ cursor: 'pointer' }} onClick={() => {
                                            window.location.reload()

                                        }}>
                                            <img style={{ width: '80px' }} src={back} alt="" />
                                        </div>
                                        <div className='col-12 col-lg-2 text-center'>
                                            <h5 className='text-muted'>Create New Category</h5>
                                        </div>
                                        <div className='col-10 col-md-6 col-lg-3'>
                                            <input type="text" className="form-control p-2" name='category' id='category' placeholder="Enter Category" value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.touched.category && formik.errors.category ? (<div className="text-danger text-left">{formik.errors.category}</div>) : null}
                                        </div>
                                        <div className='col-lg-2 col-10'>
                                            <p className='text-muted text-center'>Example : Social Sites <br /> (Max: 25) </p>
                                        </div>
                                    </div>

                                    {showCat ?
                                        <div className='text-center mt-2' style={{ textDecoration: 'underline', cursor: 'pointer', textDecorationColor: '#DFCCF4' }} onClick={() => setShowCat(false)}>
                                            <h4 style={{ color: '#DFCCF4', fontWeight: 'bold' }}>Or Select Exiting Category</h4>
                                        </div>
                                        :
                                        <div className='mt-2'>
                                            <div className='text-center'>
                                                <h4 className='text-muted'>Or Select Exiting Category</h4>
                                            </div>
                                            <div className='d-flex justify-content-center mt-3 ' id='cat'>
                                                <Checkbox.Group className='' options={CatArr} onChange={onChange} />
                                            </div>
                                        </div>}
                                    <div className="text-center">
                                        {(formik.values.category || categoryValue.length > 0) ? <button onClick={() => handleClicked()} type="button" className='btn px-5 py-3 text-muted' style={{ borderRadius: '40px', backgroundColor: '#DFCCF4', fontWeight: 'bold', border: '1px solid #7A7A7A' }} >NEXT</button> : <button type='button' className='btn px-5 py-3 text-muted' style={{ borderRadius: '40px', backgroundColor: '#DFCCF4', fontWeight: 'bold', border: '1px solid #7A7A7A' }} >NEXT</button>}
                                    </div>
                                </div> : null}
                        </div>
                        {count ?
                            <div className=''>
                                <div className='d-flex flex-wrap'>
                                    <div onClick={() => {
                                        setCount(false)
                                        setNewCat(false)
                                    }}>
                                        <img style={{ width: '80px' }} src={back} alt="" />
                                    </div>
                                    <h4 className=' mt-2 ml-2'>Category <span className='font-weight-bold'> :
                                    </span>
                                        <span className='mt-4'>
                                            {formik.values.category ? <span className="px-3 mt-3" style={{ borderRadius: '40px', color: '#DFCCF4', border: '1px solid #DFCCF4', fontWeight: 'bold' }} id='cate'>{formik.values.category}</span>
                                                : <span className='pt-5'>
                                                    {
                                                        categoryValue.map(x => <span className="px-3 mt-4 mx-2" style={{ borderRadius: '40px', color: '#DFCCF4', border: '1px solid #DFCCF4', fontWeight: 'bold' }} id='cate'>{x}</span>)
                                                    }
                                                </span>
                                            }
                                        </span></h4>

                                </div>

                                <div className='d-flex flex-wrap justify-content-center my-3 align-items-center'>
                                    <div className='col-12 col-lg-2 text-center'>
                                        <h4>Website URL/address</h4>
                                    </div>
                                    <div className='col-10 col-md-6 col-lg-3'>
                                        <input type="text" className="form-control p-2" name='sitelink' id='sitelink' placeholder="" value={formik.values.sitelink} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.sitelink && formik.errors.sitelink ? (<div className="text-danger text-left">{formik.errors.sitelink}</div>) : null}
                                    </div>
                                    <div className='col-12 col-lg-2 text-center'>
                                        <p className='text-muted text-center' style={{ fontStyle: 'italic' }}>Example : www.webname.com</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap justify-content-center my-3 align-items-center'>
                                    <div className='col-12 col-lg-2 text-center'>
                                        <h4 className=''>Name</h4>
                                    </div>
                                    <div className='col-10 col-md-6 col-lg-3'>
                                        <input type="text" className="form-control p-2" name='sitename' id='sitename' placeholder="" value={formik.values.sitename} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.sitename && formik.errors.sitename ? (<div className="text-danger text-left">{formik.errors.sitename}</div>) : null}
                                    </div>
                                    <div className='col-12 col-lg-2 text-center'>
                                        <p className='text-muted text-center' style={{ fontStyle: 'italic' }}>Example : FBook</p>
                                    </div>
                                </div>
                                <div className='text-center mt-5'>
                                    <button type="submit" className='btn px-5 py-3 text-muted' style={{ borderRadius: '40px', backgroundColor: '#DFCCF4', fontWeight: 'bold', border: '1px solid #7A7A7A' }}>DONE</button>
                                </div>

                            </div>
                            : null}
                    </form>
                </div>
                :
                <div className='text-center p-5'>
                    <div className="spinner-border text-primary" role="status">
                        {/* <span className = "sr-only">Loading...</span> */}
                    </div>
                </div>}
        </div>
    );
};

export default BookMarkNow;