import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ModalC from "./ModalC";
import { debounce } from "lodash";
const ModalA = () => {
  const initialUrl = `https://contact.mediusware.com/api/contacts/?page=1`;
  const navigate = useNavigate();

  const [onlyEven, setOnlyEven] = useState(false);
  const [searchedText, setSearchText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [evenfilterisedContacts, setEvenFilterisedContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const [loading, setLoading] = useState(false);
  const nextUrlRef = useRef();

  const contactRef = useCallback((contact) => {
    if (contact == null || nextUrlRef.current == null) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchContacts(nextUrlRef.current);

        observer.unobserve(contact);
      }
    });

    observer.observe(contact);
  }, []);

  useEffect(() => {
    fetchContacts(initialUrl, {
      overwrite: true,
    });
  }, []);

  const fetchContacts = (url, { overwrite = false } = {}) => {
    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        nextUrlRef.current = response.data.next;
        if (overwrite) {
          setContacts([...response.data.results]);
        } else {
          setContacts((prevContacts) => [
            ...prevContacts,
            ...response.data.results,
          ]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleCheckboxChange = (event) => {
    setOnlyEven(!onlyEven);
    let isChecked = event.target.checked;

    if (isChecked) {
      const filteredContacts = contacts.filter(
        (contact) => contact.id % 2 === 0
      );
      setEvenFilterisedContacts(filteredContacts);
    }
  };

  const debouncedSearch = debounce((searchText) => {
    if (searchText.length) {
      const encodedSearchText = encodeURIComponent(searchText);
      const url = `https://contact.mediusware.com/api/contacts/?search=${encodedSearchText}`;
      fetchContacts(url, {
        overwrite: true,
      });
    }
    if (searchText.length === 0) {
      fetchContacts(initialUrl, {
        overwrite: true,
      });
    }
  }, 300);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    debouncedSearch(event.target.value);
    setOnlyEven(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleClose = () => {
    navigate("/problem-2");
  };
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      const searchedText = event.target.value;

      if (searchedText.length) {
        const encodedSearchText = encodeURIComponent(searchText);
        const url = `https://contact.mediusware.com/api/contacts/?search=${encodedSearchText}`;
        fetchContacts(url, {
          overwrite: true,
        });
        setOnlyEven(false);
      }
      if (searchedText.length === 0) {
        fetchContacts(initialUrl, {
          overwrite: true,
        });
      }
    }
  };
  return (
    <>
      {selectedContact && (
        <ModalC
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: "1050" }}
      ></div>
      <div
        className="modal fade show"
        style={{
          display: selectedContact ? "none" : "block",
          zIndex: "1051",
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content"
            style={{
              maxHeight: "calc(100vh - 100px)",
              minHeight: "calc(100vh - 100px)",
            }}
          >
            <div
              className="modal-header bg-light"
              style={{ position: "sticky", top: 0, zIndex: 1100 }}
            >
              <div className="d-flex flex-column row-gap-3 justify-content-start w-100">
                <div>
                  <h3 className="modal-title">All Contacts</h3>
                </div>

                <div className="d-flex column-gap-2 justify-content-between align-items-center ">
                  <div className="d-flex column-gap-2">
                    <Link
                      to="/modalA"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#46139f",
                        borderColor: "#46139f",
                        fontSize: "20px",
                      }}
                    >
                      All Contacts
                    </Link>
                    <Link
                      to="/modalB"
                      className="btn btn-warning"
                      style={{
                        backgroundColor: "#ff7150",
                        borderColor: "#ff7150",
                        color: "#fff",
                        fontSize: "20px",
                      }}
                    >
                      US Contacts
                    </Link>
                  </div>
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={handleClose}
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#46139f",
                        color: "#000",
                        fontSize: "20px",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchedText}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="modal-body d-flex flex-column row-gap-3"
              style={{
                padding: "2rem 3rem",
                overflowY: "scroll",
                maxHeight: "600px",
              }}
            >
              {onlyEven
                ? evenfilterisedContacts.map((contact, index) => (
                    <div
                      key={crypto.randomUUID()}
                      className="d-flex flex-column row-gap-2"
                      ref={
                        index === contacts.length - 1 ? contactRef : undefined
                      }
                    >
                      <div>
                        <span
                          onClick={() => handleContactClick(contact)}
                          style={{ fontSize: "21px", cursor: "pointer" }}
                        >
                          Contact: {contact.phone}
                        </span>
                      </div>
                    </div>
                  ))
                : contacts.map((contact, index) => (
                    <div
                      key={crypto.randomUUID()}
                      className="d-flex flex-column row-gap-2"
                      ref={
                        index === contacts.length - 1 ? contactRef : undefined
                      }
                    >
                      <div>
                        <span
                          onClick={() => handleContactClick(contact)}
                          style={{ fontSize: "21px", cursor: "pointer" }}
                        >
                          Contact: {contact.phone}
                        </span>
                      </div>
                    </div>
                  ))}
              {loading === false &&
              (evenfilterisedContacts.legth || contacts.length === 0)
                ? "No Contacts Found"
                : null}
              {loading && <div className="skeleton">Loading...</div>}
            </div>
            <div className="modal-footer d-flex column-gap-2 align-items-center justify-content-start mx-4 mb-2">
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={onlyEven}
                  onChange={handleCheckboxChange}
                  id="onlyEvenCheckbox"
                  style={{ fontSize: "20px" }}
                />
                <label
                  style={{ fontSize: "20px" }}
                  className="form-check-label"
                  htmlFor="onlyEvenCheckbox"
                >
                  Only even
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalA;
