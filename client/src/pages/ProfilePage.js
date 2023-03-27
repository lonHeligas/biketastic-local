import { useEffect, useState } from "react";
import { ProfileForm, UserOrder } from '../components';
import { useAppCtx } from "../utils/AppContext";

const ProfilePage = () => {
    const [formData, setFormData] = useState({ first_name: '', last_name: '', city: '', state: '', email: "", password: "" });
    const [view, setView] = useState("profile");

    const { user, logout } = useAppCtx();


    const toggleView = (e) => {
      setView(e.target.id);
    }

    useEffect(() => {
        if (user) setFormData({ ...formData, first_name: user.first_name, last_name: user.last_name, city: user.city, state: user.state, email: user.email });
    }, [user]);

    if (!user) return <div>Loading...</div>;


    return (
        <>
            <section className='container-fluid mt-3 col-10 mx-auto'>
                <div className='row'>
                    <h1 className='text-white'>
                        {user.first_name} {user.last_name}
                    </h1>
                </div>
                <div className='row flex justify-content-between mb-5'>
                    <p className='text-muted col-2 align-self-center mb-0'>
                        {user.city}, {user.state}
                    </p>
                    <button
                        type='button'
                        className='btn btn-outline-secondary col-1'
                        onClick={logout}
                    >
                        Sign Out
                    </button>
                </div>
            </section>

            <section className='container-fluid bg-white col-10 mx-auto rounded-3 py-4' style={{ minHeight: '600px' }}>
                <div className='row'>
                    <div className='container-fluid col-4 px-5'>
                        <ul className='list-group'>
                            <li className='list-group-item list-group-item-secondary me-3 py-3' id='profile' onClick={toggleView} >
                                Profile
                            </li>
                            <li className='list-group-item list-group-item-secondary me-3 py-3' id="orders" onClick={toggleView}>
                                Orders
                            </li>
                        </ul>
                    </div>

                    <div className='container-fluid col-8 m-0'>
                        <div className='row'>
                            <h3 className='text-center'>{ view === 'profile' ? 'Profile' : 'Orders'}</h3>
                        </div>

                        { view === 'profile' ? (
                          <ProfileForm user={user} formData={formData} setFormData={setFormData} />
                        ) : (
                          <>
                            <p className="text-center">{user.orderCount} items</p>
                            
                            { user.orderCount > 0 ? (
                              <>
                                { user.orders.map((order) => <UserOrder order={order} />)}
                              </>
                            ) : (
                              <div className='container'>
                                <h3>You have no purchase history</h3>
                              
                              </div>
                            )}
                          </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
