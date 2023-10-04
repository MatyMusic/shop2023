import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "./../../components/Message";
import Loader from "./../../components/Loader";
import FormContainer from "./../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success("מוצר התעדכן בהצלחה");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        חזרה אחורה
      </Link>

      <FormContainer>
        <h1>עדכן מוצר</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/*  */}
            <Form.Group controlId="name" className="my-2">
              <Form.Label>שם </Form.Label>
              <Form.Control
                type="text"
                placeholder="הכנס שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*  */}
            <Form.Group controlId="price" className="my-2">
              <Form.Label>מחיר </Form.Label>
              <Form.Control
                type="number"
                placeholder="הכנס מחיר"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*  */}
            {/* {//!image} ! */}

            <Form.Group controlId="image" className="my-2">
              <Form.Label>תמונה</Form.Label>
              <Form.Control
                type="text"
                placeholder="הכנס כתובת תמונה"
                value={image}
                onChange={(e) => setImage}
              ></Form.Control>
              <Form.Control
                type="file"
                label="בחר קובץ"
                onChange={uploadFileHandler}
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>מותג </Form.Label>
              <Form.Control
                type="text"
                placeholder="הכנס מותג"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*  */}
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>כמות </Form.Label>
              <Form.Control
                type="number"
                placeholder="הכנס כמות"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*  */}
            <Form.Group controlId="category" className="my-2">
              <Form.Label>קטגוריה </Form.Label>
              <Form.Control
                type="text"
                placeholder="הכנס קטגוריה"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*  */}
            <Form.Group controlId="description" className="my-2">
              <Form.Label>תיאור </Form.Label>
              <Form.Control
                type="text"
                placeholder="הכנס תיאור"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/*  */}

            <Button type="submit" variant="primary" className="my-2">
              עדכן מוצר
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
