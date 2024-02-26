import React from 'react';

const ModalC = ({ contact, onClose }) => {
    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: '1050' }}></div>
            <div className="modal fade show modal-lg" style={{ display: 'block', zIndex: '1051' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Contact Details</h5>
                        </div>
                        <div className="modal-body">
                            <p style={{ fontSize: '21px', cursor: 'pointer' }}>Country Name: {contact.country.name}</p>
                            <p style={{ fontSize: '21px', cursor: 'pointer' }}>Phone: {contact.phone}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalC;
