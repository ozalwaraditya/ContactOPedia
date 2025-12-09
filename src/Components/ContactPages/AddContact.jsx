import { useEffect, useState } from "react";

function AddContact(props) {
  const [statusMessage, setStatusMessage] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (props.isUpdating && props.selectedContact) {
      setFormData({
        name: props.selectedContact.name,
        email: props.selectedContact.email,
        phone: props.selectedContact.phone,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [props.isUpdating, props.selectedContact]);

  function handleInputChange(e) {
    console.log(e.target.name + " " + e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // React-19 Action Handler (instead of onSubmit)
  function handleAction(formData) {
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    console.log(contactData); // See form data

    try {
      // calling parent callback
      var response = undefined;

      if (props.isUpdating && props.selectedContact) {
        //updating
        response = props.handleUpdateContact({
          id: props.selectedContact.id,
          isFavorite: props.selectedContact.isFavorite,
          ...contactData,
        });
      } else {
        // updating
        response = props.handleAddContact(contactData);
      }

      if (response.success) {
        setStatusMessage({
          successMessage: response.message,
          errorMessage: "",
        });
      } else {
        setStatusMessage({
          successMessage: "",
          errorMessage: response.message,
        });
      }
    } catch (error) {
      console.log(error);
      setStatusMessage({
        successMessage: "",
        errorMessage: "Something went wrong!",
      });
    }
  }

  return (
    <div
      className="col-12 text-white p-3"
      style={{
        border: "1px solid #555",
        borderRadius: "10px",
        backgroundColor: "#323637",
      }}
    >
      {/* React-19 Form Action */}
      <form action={handleAction}>
        <div className="row p-2">
          <div className="col-12 text-white-50 mb-3">
            <h5>{props.isUpdating ? "Update Contact" : "Add Contact"}</h5>
          </div>

          <div className="col-12 col-md-4 p-1">
            <input
              className="form-control form-control-sm"
              placeholder="Name..."
              value={formData.name} // This value is controlled by React
              onChange={handleInputChange} // It always requires a OnChange function to handle
              name="name"
            />
          </div>

          <div className="col-12 col-md-4 p-1">
            <input
              className="form-control form-control-sm"
              placeholder="Email..."
              value={formData.email}
              onChange={handleInputChange} // It always requires a OnChange function to handle
              name="email"
            />
          </div>

          <div className="col-12 col-md-4 p-1">
            <input
              className="form-control form-control-sm"
              placeholder="Phone..."
              value={formData.phone}
              onChange={handleInputChange} // It always requires a OnChange function to handle
              name="phone"
            />
          </div>
        </div>

        {/* Status Messages */}
        <div className="row p-2">
          {statusMessage.successMessage && (
            <div className="col-12 text-center text-success mb-2">
              {statusMessage.successMessage}
            </div>
          )}

          {statusMessage.errorMessage && (
            <div className="col-12 text-center text-danger mb-2">
              {statusMessage.errorMessage}
            </div>
          )}

          <div className={`${props.isUpdating ? "col-6 p-1" : "col-12 p-1"}`}>
            <button type="submit" className="btn btn-primary btn-sm w-100">
              {props.isUpdating ? "Update" : "Create"}
            </button>
          </div>
          {props.isUpdating && (
            <div className="col-6 p-1">
              <button
                onClick={props.cancelClick}
                type="submit"
                className="btn btn-danger btn-sm w-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddContact;
