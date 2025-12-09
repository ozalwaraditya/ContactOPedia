import Contacts from "./Contacts";

function FavoriteContacts(props) {
  return (
    <div
      className="col-12 p-2"
      style={{ borderRadius: "10px", backgroundColor: "#323637" }}
    >
      <div className="text-center text-white-50">Favorites</div>
      <div className="p-2">
        {props.contacts.map((contact, index) => (
          <Contacts
            favoriteClick={props.favoriteClick}
            deleteClick={props.deleteClick}
            updateClick={props.updateClick}
            key={index}
            contact={contact}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteContacts;
