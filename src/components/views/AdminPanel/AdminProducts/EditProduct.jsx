import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearJustEdited, editProduct } from "../../../../redux/productReducer";
import styles from "./styles.module.css";
import axios from 'axios';
import { getCategorys } from "../../../../redux/categoryReducer"
import { useAlert, transitions, positions, Provider as AlertProvider } from 'react-alert'

const EditProduct = () => {

    const dispatch = useDispatch();
    const pid = useParams().id
    const alert = useAlert()

    let justEdited = useSelector(state => state.products.justEdited)
    if(justEdited) {
      dispatch(clearJustEdited())
      alert.show('Product successfully edited', {
        position: positions.TOP_CENTER,
        timeout: 2000,
        type: "info",
        offset: '185px',
        transition: transitions.SCALE
      })
    }

    useEffect(()=>{
      axios.get('/api/product/'+pid).then((res)=>{
        setProduct({...res.data, categoryName:res.data.category.name})
      })
    },[])

    const categorys = useSelector((state) => state.categorys.results);

    useEffect(() => {
      dispatch(getCategorys());
    }, [dispatch])

    const emptyModel = {
      color: "",
      size: "",
      description: "",
      images: [],
      stock: "",
      price: "",
    };

    const [inputImageUrl, setInputImageUrl] = useState('https://')
    const [inputModel, setInputModel] = useState(emptyModel)
    const [product, setProduct] = useState({
      category:{name: ""},
      name: "",
      brand: "",
      description: "",
      productModels: [],
    });

    const removeModel = index => setProduct({
      ...product,
      productModels: product.productModels.filter((m,i) => i !== index)
    })

    const removeImg = (modelIndex, imageIndex) => setProduct({
      ...product,
      productModels: product.productModels.map((m, i) => (modelIndex == i) ? {...m, images: m.images.filter((img,imgi)=> imgi !== imageIndex)} : m)
    })

    const addImg = (modelIndex, imageURL) => setProduct({
      ...product,
      productModels: product.productModels.map((m, i) => (modelIndex == i) ? {...m, images: [...m.images, imageURL]} : m)
    })


    const onChangeInputModel = e => {
      let { name, value } = e.target
      setInputModel({...inputModel, [name]: value})
    }

    const createModel = () => {
      setProduct({
      ...product,
      productModels: [...product.productModels, emptyModel]
      })
      setInputModel(emptyModel)
    }

    const [productForm, setProductForm] = useState({
        category: {name:""},
        name: "",
        brand: "",
        description: "",
    })

    const [productModelForm, setProductModelForm] = useState({
    })

    const onChangeCreateProduct = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const onChangeModel = (e, idx) => {
        const {name, value} = e.target;
        setProduct({...product, productModels:product.productModels.map((model, i) => idx === i ? {...model, [name]: value} : model)});
    }

    const onChangeImages = (e) => {
        const { value } = e.target;
        setProductModelForm({...productModelForm, images: [value]})
    }



    const onSubmitProduct = async (e) => {
        e.preventDefault();
        if(product.productModels.length == 0) return alert.show('necesitas por lo menos un modelo', {
                                                            position: positions.TOP_CENTER,
                                                            timeout: 2000,
                                                            type: "info",
                                                            offset: '185px',
                                                            transition: transitions.SCALE
                                                          })

        if(product.productModels[0].images.length == 0) return alert.show('necesitas por lo menos una imagen en el primer modelo', {
                                                            position: positions.TOP_CENTER,
                                                            timeout: 2000,
                                                            type: "info",
                                                            offset: '185px',
                                                            transition: transitions.SCALE
                                                          })
        dispatch(editProduct({pid, product}))
    }
  return (
    <div className={styles.crud_product_wrapper}>
      <h1>Edit product #{product.id}</h1>
      <form onSubmit={onSubmitProduct} className={styles.full_form}>

      <div className={styles.product_form_section}>

      <div>
        <span>Product Name</span>
      </div>

      <div>
        <input
          name="name"
          defaultValue={product.name}
          onChange={onChangeCreateProduct}
        />
      </div>

      <div>
        <span>Brand</span>
      </div>

      <div>
      <input
        placeholder="Product brand"
        name="brand"
        defaultValue={product.brand}
        onChange={onChangeCreateProduct}
      />
      </div>

      <div>
        <span>Category</span>
      </div>

      <div>
        <select name="categoryName" onChange={onChangeCreateProduct} value={product.categoryName}>
        {categorys.map(({name}, i)=><option key={i} value={name} >{name}</option>)}
        </select>
      </div>

      <div>
        <span>Description</span>
      </div>

      <div>
        <textarea
          placeholder="Product description"
          name="description"
          defaultValue={product.description}
          onChange={onChangeCreateProduct}
        ></textarea>
      </div>

      <div>
      </div>

      <div>
      <input type='submit' value='enviar' />
      </div>

      </div>

      <div className={styles.models} >

        {/* <div className={styles.single_model_new}>
          {/* <div>Description</div><div>
          <input placeholder="description" name="description" value={inputModel.description} onChange={onChangeInputModel} />
          </div>
          <div>Color</div><div>
          <input placeholder="color" name="color" value={inputModel.color} onChange={onChangeInputModel}/>
          </div>
          <div>Size</div><div>
          <input placeholder="size" name="size" type='number' value={inputModel.size} onChange={onChangeInputModel} />
          </div>
          <div>Stock</div><div>
          <input placeholder="stock" name="stock" type='number' value={inputModel.stock} onChange={onChangeInputModel} />
          </div>
          <div>Price</div><div>
          <input placeholder="price" name="price" type='number'  value={inputModel.price} onChange={onChangeInputModel} />
          </div><div></div><div>
          </div>
        </div> */}


        <input type='button' className={styles.add_model_btn} onClick={()=>createModel()} value='add model' />


        {product.productModels.map((model, modelIdx) => 
        <div key={modelIdx} className={styles.single_model}>

          <div className={styles.model_details}>
          <div className={styles.product_model_form}>
            <div>Description</div><div>
            <input onChange={e=>onChangeModel(e, modelIdx)} name="description" defaultValue={model.description}/>
            </div>
            <div>Color</div><div>
            <input onChange={e=>onChangeModel(e, modelIdx)} name="color" defaultValue={model.color} />
            </div>
            <div>Size</div><div>
            <input onChange={e=>onChangeModel(e, modelIdx)} type="number" step='0.5' name="size" defaultValue={model.size} />
            </div>
            <div>Stock</div><div>
            <input onChange={e=>onChangeModel(e, modelIdx)} type="number" name="stock" defaultValue={model.stock}/>
            </div>
            <div>Price $ </div><div>
            <input onChange={e=>onChangeModel(e, modelIdx)} type="number" name="price" defaultValue={model.price}/> 
            </div>
            <div>
            </div>
            <div>
            <input type='button' onClick={()=>removeModel(modelIdx)} className={styles.remove_btn} value='remove model' />
            </div>
          </div>
          </div>

          <div className={styles.model_images}>
            {model.images.map((img, imgIdx)=>
              <div className={styles.single_image}>
                <div>
                <img src={img}/>
                </div>
                <div>
                <input value={img} />
                </div>
                <div>
                <input type='button' onClick={()=>removeImg(modelIdx, imgIdx)} className={styles.remove_img_btn} value=' x '/>
                </div>
              </div>
            )}
            <input value={inputImageUrl} onChange={e=>setInputImageUrl(e.target.value)} />
            <input type='button' onClick={()=>addImg(modelIdx, inputImageUrl)} value='add' />
          </div>

        </div>
        )}


      </div>

      </form>
    </div>
  );
};

export default EditProduct;