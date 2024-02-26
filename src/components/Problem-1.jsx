import React, { useState, useEffect } from 'react';

const Problem1 = () => {
    const [values, setValues] = useState({
        name: '',
        status: ''
    });
    const [show, setShow] = useState('all');
    const [data, setData] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { name: values.name, status: values.status.toLowerCase() };
        setData([...data, newData]);
        setValues({ name: '', status: '' });
    };

    const handleClick = (val) => {
        setShow(val);
    };

    const filteredData = data.filter((item) => {
        if (show === 'active') {
            return item.status.toLowerCase() === 'active';
        } else if (show === 'completed') {
            return item.status.toLowerCase() === 'completed';
        }
        return true;
    });

    const sortedData = filteredData.sort((a, b) => {
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();

        if (statusA === 'active' && statusB !== 'active') {
            return -1;
        } else if (statusA !== 'active' && statusB === 'active') {
            return 1;
        } else if (statusA === 'completed' && statusB !== 'completed') {
            return -1;
        } else if (statusA !== 'completed' && statusB === 'completed') {
            return 1;
        }
        return 0;
    });

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                value={values.status}
                                onChange={(e) => setValues({ ...values, status: e.target.value })}
                                type="text"
                                className="form-control"
                                placeholder="Status"
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${show === 'all' && 'active'}`}
                                type="button"
                                onClick={() => handleClick('all')}
                            >
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${show === 'active' && 'active'}`}
                                type="button"
                                onClick={() => handleClick('active')}
                            >
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${show === 'completed' && 'active'}`}
                                type="button"
                                onClick={() => handleClick('completed')}
                            >
                                Completed
                            </button>
                        </li>
                    </ul>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-capitalize'>{item.name}</td>
                                    <td className='text-capitalize'>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
