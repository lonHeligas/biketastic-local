import React from "react";
import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppContext";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";

const ProductPage = () => {
  // Set state for search result and search query
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({ quantity: 0 });
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  const [quantityText, setQuantityText] = useState("");

  const { cartItems, setCartItems } = useAppCtx();

  const fetchProduct = async (e) => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get("product_id");
    const productResponse = await fetch(`/api/product/${id}`);
    const singleProduct = await productResponse.json();

    const productImages = singleProduct.images;
    setImages(productImages);

    setProduct(singleProduct);
    setSelectedImage(productImages[0]);
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quantity == 0) {
      const productContainer = {
        title: product.title,
        price: product.price * formData.quantity,
        quantity: parseInt(formData.quantity),
        image: product.image,
        stripe_id: product.stripe_id,
      };

      setCartItems([...cartItems, productContainer]);

      setAddedToCart(true);

      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } else {
      setQuantityText("Please enter a quantity");
    }

    if (quantityText === "Please enter a quantity") {
      setTimeout(() => {
        setQuantityText("");
      }, 100);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container>
      <Row className="py-3">
        <>
          <Col className="col-1 flex-column d-none d-md-block">
            {images.map((image) => {
              return (
                <div>
                  <img
                    src={`/img/${image}`}
                    className="img-fluid thumbnails"
                    onClick={() => setSelectedImage(image)}
                  />
                </div>
              );
            })}
          </Col>
          <Col className="col-5 d-none d-md-block">
            <div>
              <img
                src={`/img/${selectedImage}`}
                className="img-fluid selected-image"
                style={{ width: "100%" }}
              />
            </div>
          </Col>
          <Col className="col-12 text-center d-md-none">
            <Carousel className="carousel">
              {images.map((image) => {
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`/img/${image}`}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </>

        <Col className="single-product-details-col">
          <div className="single-product-details text-center">
            <h4 className="py-3">{product.title}</h4>
            <p>{product.description}</p>
            <p>Number in stock: {product.stock}</p>
            <p>Price: ${product.price}</p>
            <form className="form mb-3" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="px-2">Enter Quantity:</label>

                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  style={{
                    width: "50px",
                    marginBottom: "25px",
                    textAlign: "center",
                  }}
                  onChange={handleInput}
                />

                <Row className="justify-content-center">
                  {addedToCart ? (
                    <Button className="btn-outline-success add-to-cart-button">
                      Added to Cart
                    </Button>
                  ) : (
                    <Button
                      className="btn-outline-danger add-to-cart-button"
                      onClick={handleFormSubmit}
                    >
                      Add to Cart
                    </Button>
                  )}
                  {quantityText === "" ? (
                    <p></p>
                  ) : (
                    <p className="text-danger">{quantityText}</p>
                  )}
                </Row>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
