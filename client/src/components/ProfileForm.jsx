import { useState } from 'react';


const ProfileForm = ({ user, formData, setFormData, }) => {
    const [updateResult, setUpdateResult] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const update = async (e) => {
        e?.preventDefault();
        const resp = await fetch(`/api/user/${user._id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!resp.ok) {
            return setUpdateResult("fail");
        }
        setUpdateResult("success");
        window.location.reload();
    };

    return (
        <div className='row justify-content-center mt-4'>
                            <div style={{ width: "50%" }}>
                                <form onSubmit={update} className='mb-2'>
                                    <div className='form-group mb-2'>
                                        <label className='text-black'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='first_name'
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-group mb-2'>
                                        <label className='text-black'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='last_name'
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-group mb-2'>
                                        <label className='text-black'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='city'
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-group mb-2'>
                                        <label className='text-black'>
                                            State
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='state'
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-group mb-2'>
                                        <label className='text-black'>
                                            Email Address
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className='form-group mb-2'>
                                        <label className='text-black'>
                                            Password
                                        </label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className='form-group justify-content-center d-flex'>
                                        <button className='btn btn-primary'>
                                            Update Profile
                                        </button>
                                    </div>
                                </form>

                                {updateResult === "success" && (
                                    <div
                                        className='alert alert-success'
                                        role='alert'
                                    >
                                        Update successful!
                                    </div>
                                )}

                                {updateResult === "fail" && (
                                    <div
                                        className='alert alert-danger'
                                        role='alert'
                                    >
                                        Update failed!
                                    </div>
                                )}
                            </div>
                        </div>
    );
}

export default ProfileForm;