function Contacts(props) {
  return (
    <div
      className="row align-items-center p-3 mb-3"
      style={{ borderRadius: "20px", border: "1px solid #555" }}
    >
      {/* Image */}
      <div className="col-2 d-flex justify-content-center">Image</div>

      {/* Name + Email + Phone */}
      <div className="col-6 text-warning">
        <span className="h4 d-block mb-1">{props.contact.name}</span>
        <div className="text-white-50 small">
          {props.contact.email}
          <br />
          {props.contact.phone}
        </div>
      </div>

      {/* Star Button */}
      <div className="col-1 d-flex justify-content-center">
        <button
          onClick={() => {
            props.favoriteClick(props.contact);
          }}
          className={`btn btn-sm m-1 ${
            props.contact.isFavorite ? "btn-warning" : "btn-outline-warning"
          }`}
        >
          <i className="bi bi-star-fill"></i>
        </button>
      </div>

      {/* Edit + Delete Buttons */}
      <div className="col-3 d-flex justify-content-end">
        <button
          onClick={() => {
            props.updateClick(props.contact);
          }}
          className="btn btn-info btn-sm mx-1"
        >
          <i className="bi bi-pencil-square"></i>
        </button>

        <button
          onClick={() => {
            props.deleteClick(props.contact);
          }}
          className="btn btn-danger btn-sm mx-1"
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default Contacts;
