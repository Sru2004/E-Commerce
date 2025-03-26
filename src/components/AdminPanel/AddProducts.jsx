import { useState, useEffect, useRef, useContext } from 'react';
import AccountSideBar from './AccountSideBar';
import './AdminPanel.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Context } from '../../Context';

function AddProducts() { 

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [availableQty, setAvailableQty] = useState("");
    const [newArrival, setNewArrival] = useState(true);
    const [size, setSize] = useState({
        s : false,
        m : false,
        l : false,
        xl : false,
        xxl : false
    });

    const {setProducts} = useContext(Context);

    const [image, setImage] = useState(undefined);
    const [selectedFile, setSelectedFile] = useState(null);

    const categoryRef = useRef();
    const subCategoryRef = useRef();


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    
    const handleUpload = async () => {

        if(title==="" || price==="" || originalPrice==="" || availableQty===""){
            return toast.error("Please Fill All the Details", {
                position: 'bottom-right'
            })
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
    
        await axios.post(process.env.REACT_APP_BASE_URL+'/file/upload', formData)
        .then(response => {
            setImage(response.data.imagePath);
        })
        .catch(error => {
            toast.error(error?.response?.data?.message, {
                position: 'bottom-right'
            })
        });
    }

    async function getAllProducts(){
        await axios.get(process.env.REACT_APP_BASE_URL+"/product/get-all").then(res=>{
            setProducts(res?.data?.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    async function addProductFunc(){
        if(image){
            await axios.post(process.env.REACT_APP_BASE_URL+'/product/create', {
                title,
                // category: categoryRef.current.value,
                // subCategory: subCategoryRef.current.value,
                img: image,
                price,
                originalPrice,
                qty: availableQty,
                newArrival,
                // size
            }).then(res=>{
                toast.success("Product Added Successfully", {
                    position: 'bottom-right'
                })
                getAllProducts();
            }).catch(error=>{
                toast.error(error?.response?.data?.message, {
                    position: 'bottom-right'
                })
            })
        }
    }

    useEffect(()=>{
        addProductFunc();
    }, [image])

    function setSizeFunc(e){
        if(e.target.value === "s"){
            setSize({
                ...size,
                s: !size.s
            });
        }
        else if(e.target.value === "m"){
            setSize({
                ...size,
                m: !size.m
            });
        }
        else if(e.target.value === "l"){
            setSize({
                ...size,
                l: !size.l
            });
        }
        else if(e.target.value === "xl"){
            setSize({
                ...size,
                xl: !size.xl
            });
        }
        else if(e.target.value === "xxl"){
            setSize({
                ...size,
                xxl: !size.xxl
            });
        }
    }

    return (
        <>
            <div className="view-account-main-div">
                <AccountSideBar />
                <div className="view-account-right">
                    <div className="view-account-right-main-heading">Add Products</div>
                    <div className="view-account-right-main-div">
                        <div className="account-info-main-div">
                            <div className="account-info-text"><b>Product Name: </b>
                                <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                            </div>
                            {/* <div className="account-info-text"><b>Category: </b>
                                <select ref={categoryRef} name="category">
                                    <option value="Anime">Anime</option>
                                    <option value="Gym">Gym</option>
                                    <option value="Marvel">Marvel</option>
                                </select>
                            </div> */}
                            {/* <div className="account-info-text"><b>Sub Category: </b>
                                <select ref={subCategoryRef} name="subcategory">
                                <option value="T-Shirt">T-Shirt</option>
                                <option value="Hoodie">Hoodie</option>
                                </select>
                            </div> */}
                            <div className="account-info-text"><b>Select Image: </b>
                            <input type="file" onChange={handleFileChange} accept="image/*" className="login-input-field"/>
                            </div>
                            <div className="account-info-text"><b>Price: </b>
                                <input type="text" onChange={(e)=>setPrice(e.target.value)} value={price}/>
                            </div>
                            <div className="account-info-text"><b>Original Price: </b>
                                <input type="text" onChange={(e)=>setOriginalPrice(e.target.value)} value={originalPrice}/>
                            </div>
                            <div className="account-info-text"><b>AvailableQty: </b>
                                <input type="text" onChange={(e)=>setAvailableQty(e.target.value)} value={availableQty}/>
                            </div>
                            <div className="account-info-text"><b>New Arrival: </b>
                                <input type="checkbox" value={newArrival} onChange={()=>setNewArrival(!newArrival)} checked={newArrival}/>
                            </div>
                            {/* <div className="account-info-text-size"><b>Size:</b>
                                <input type="checkbox" onClick={(e)=>setSizeFunc(e)} value="s"/><b>S</b> 
                                <input type="checkbox" onClick={(e)=>setSizeFunc(e)} value="m" /><b>M</b> 
                                <input type="checkbox" onClick={(e)=>setSizeFunc(e)} value="l"/><b>L</b> 
                                <input type="checkbox" onClick={(e)=>setSizeFunc(e)} value="xl"/><b>XL</b> 
                                <input type="checkbox" onClick={(e)=>setSizeFunc(e)}  value="xxl"/><b>XXL</b> 
                            </div>                  */}
                        </div>
                    </div>
                    <div className='sumbit-btn-div-addProduct'>
                        <button className="sumbit-btn" onClick={handleUpload}>Submit</button>
                        {/* <button className="sumbit-btn" onClick={handleSubmit}>Submit</button> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default AddProducts;