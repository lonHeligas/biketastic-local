import { useState, useEffect } from "react";
import { useAppCtx } from "../utils/AppContext";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [cancelation, setCancelation] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState();
  const { setCartItems } = useAppCtx();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancelation = () => setCancelation(true);
  const handleCancelationClose = () => setCancelation(false);

  const fetchProducts = async (id) => {
    const productsResponse = await fetch(`/api/category/${id}`);
    const products = await productsResponse.json();
    setSelectedProducts(products.products);
  };

  const testCheckout = () => {
    const params = new URLSearchParams(document.location.search);
    if (params.get("checkout")) {
      if (params.get("checkout") === "success") {
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setIsSuccessful(true);
        handleShow();
      } else if (params.get("checkout") === "cancel") {
        setIsSuccessful(false);
        handleCancelation();
      }
    }
  };

  const fetchCategories = async () => {
    let productArr = [];
    // Fetch categories
    const categoryResponse = await fetch("/api/category");
    const category = await categoryResponse.json();

    category.map((category) => {
      return (productArr = [...productArr, ...category.products]);
    });

    setSelectedProducts(productArr);

    // Update state with fetched data
    setCategories(category);
  };

  useEffect(() => {
    fetchCategories();
    testCheckout();
  }, []);

  const handleSelect = (selectedIndex) => {
    setSelectedCategoryIndex(selectedIndex);
  };
  return (
    <div>
      {isSuccessful ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p className="modal-success-text">
              The transaction was successful.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className=" modal-success-button" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={cancelation} onHide={handleCancelationClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p className="text-center">The transaction has been canceled</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className=" modal-cancelation-button"
              onClick={handleCancelationClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="home carousel-styling container-fluid">
        <h2 className="category-header">Our Categories</h2>
        <Row>
          <Col className="col-12">
            <Carousel
              activeIndex={selectedCategoryIndex}
              onSelect={handleSelect}
              interval={2000}
              fade
              className="carousel-main"
            >
              {categories.map((category) => (
                <Carousel.Item
                  onClick={() => fetchProducts(category._id)}
                  key={category._id}
                  className="category-item"
                >
                  <Carousel.Caption className="category-title">
                    <h3 className="d-flex text-align-center category-title-text">
                      {category.name.toUpperCase()}
                    </h3>
                  </Carousel.Caption>
                  <img
                    className="category-images d-block w-100"
                    src={`/img/${category.name}_stock.png`}
                    alt={category.name}
                    style={{ objectFit: "contain" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        <Row className="product-listings text-align-center">
          <h2 className="product-heading d-flex"> Our Products</h2>
          <Row className="product-row">
            {selectedProducts.map((product) => (
              <Col
                className="col-4 col-md-4 text-center pb-5 product-column"
                key={product._id}
              >
                <a href={`/product?product_id=${product._id}`}>
                  <Card className="product-card" key={product._id}>
                    <img
                      src={`/img/${product.images[0]}`}
                      style={{ height: "188px", objectFit: "contain" }}
                      className="product-image"
                      alt={product.title}
                    />
                    <Card.Body>
                      <Card.Title className="producttitle">
                        {product.title}
                      </Card.Title>
                      <Card.Text className="product-price">
                        ${product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
