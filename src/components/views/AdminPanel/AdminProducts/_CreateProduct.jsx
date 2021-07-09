import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { clearJustCreated, createProduct } from "../../../../redux/productReducer";
import styles from "./styles.module.css";
import axios from 'axios';
import { getCategorys } from "../../../../redux/categoryReducer";


const CreateProduct = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    let justCreated = useSelector(state => state.products.justCreated)
    if(justCreated !== null) {
      dispatch(clearJustCreated())
      history.push(`/product/${justCreated}`)
    }

    const categorys = useSelector((state) => state.categorys.results);

    useEffect(() => {
      setProduct(p=>({...p, categoryName: categorys[0]?.name}))
    }, [categorys])

    useEffect(() => {
      dispatch(getCategorys());
    }, [dispatch]);

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
      category: {name:''},
      name: "",
      brand: "",
      description: "",
      productModels: [],
      categoryName: '',
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
      productModels: [...product.productModels, inputModel]
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
        if(product.productModels.length == 0) return alert('necesitas por lo menos un modelo!')
        if(product.productModels[0].images.length == 0) return alert('necesitas por lo menos una imagen en el primer modelo!')
        dispatch(createProduct(product))
    }

  return (
    <>
      <h1>Create Product</h1>
      <form onSubmit={onSubmitProduct}>

      <div>
        <input
          placeholder="Product name"
          name="name"
          defaultValue={product.name}
          onChange={onChangeCreateProduct}
        />
        <br/>
        <input
          placeholder="Product brand"
          name="brand"
          defaultValue={product.brand}
          onChange={onChangeCreateProduct}
        />
        <br/>
        <select name="categoryName" onChange={onChangeCreateProduct} defaultValue={product.category.name} >
        {categorys.map(({name}, i)=><option key={i} value={name}>{name}</option>)}
        </select>
      </div>
      <div>
        <textarea
          placeholder="Product description"
          name="description"
          defaultValue={product.description}
          onChange={onChangeCreateProduct}
        ></textarea>
      </div>
      <div className={styles.models} >
        {product.productModels.map((model, modelIdx) => 
        <div key={modelIdx} className={styles.single_model}>
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
                <input type='button' onClick={()=>removeImg(modelIdx, imgIdx)} value='remove'/>
                </div>
              </div>
            )}
            <input value={inputImageUrl} onChange={e=>setInputImageUrl(e.target.value)} />
            <input type='button' onClick={()=>addImg(modelIdx, inputImageUrl)} value='add' />
          </div>
          <div>
            <input onChange={e=>onChangeModel(e, modelIdx)} placeholder="Product model color" name="color" defaultValue={model.color} />
            <input onChange={e=>onChangeModel(e, modelIdx)} placeholder="Product model description" name="description" defaultValue={model.description}/>
            <input onChange={e=>onChangeModel(e, modelIdx)} placeholder="Product model size" type="number" name="size" defaultValue={model.size} />
            <input onChange={e=>onChangeModel(e, modelIdx)} placeholder="Product model stock" name="stock" defaultValue={model.stock}/>
            <input onChange={e=>onChangeModel(e, modelIdx)} placeholder="Product model price" name="price" defaultValue={model.price}/>
            <input type='button' onClick={()=>removeModel(modelIdx)} value='remove model' />
          </div>
        </div>
        )}
        <div className={styles.single_model_new}>
          <input placeholder="Product model color" name="color" value={inputModel.color} onChange={onChangeInputModel}/>
          <input placeholder="Product model size" name="size" value={inputModel.size} onChange={onChangeInputModel} />
          <input placeholder="Product model description" name="description" value={inputModel.description} onChange={onChangeInputModel} />
          <input placeholder="Product model stock" name="stock" value={inputModel.stock} onChange={onChangeInputModel} />
          <input placeholder="Product model price" name="price" value={inputModel.price} onChange={onChangeInputModel} />
          <input type='button' onClick={()=>createModel()} value='add model' />
        </div>
      </div>
      <input type='submit' value='enviar' />
      </form>
    </>
  );
};

export default CreateProduct;