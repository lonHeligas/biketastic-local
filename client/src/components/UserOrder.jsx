import { BsArrowRightShort } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import dayjs from 'dayjs';



const UserOrder = ({ order }) => {
    console.log(order);

    const [ show, setShow ] = useState(false);

    const formattedDate = dayjs(order.purchase_date).format('MMM D, YYYY');

    let orderTotal = 0;
    
    
    return (
        <div className="container pe-5 my-4 border-bottom">
            <div className="row d-flex justify-content-between" key={order._id}>
            <div className="col-6">
                <h4>Order {order._id}</h4>
                <p id='orderModalToggle' onClick={() => setShow(true)}>View Order <BsArrowRightShort /></p>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{order._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { order.product_id.map( product => {
                            orderTotal += product.price;
                            return (
                                <div className='row d-flex'>
                                    <div className='col-4 p-3'>
                                        <img className='img-fluid' src={`/img/${product.images[0]}`} alt={product.name} />
                                    </div>

                                    <div className='col-4 align-self-center'>
                                        <p>{product.title}</p>
                                    </div>

                                    <div className='col-4 align-self-center'>
                                        <p className='text-end'>${product.price}</p>
                                    </div>

                                </div>
                            )

                        })}
                        
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <p className='mt-3 text-center'>{`Total: $${orderTotal.toFixed(2)}`}</p>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        
                    </Modal.Footer>
                </Modal>

            </div>
            <div className="col-6 d-flex justify-content-end">
                <p>{formattedDate}</p>
            </div>
            </div>
        </div>
    );
}

export default UserOrder;