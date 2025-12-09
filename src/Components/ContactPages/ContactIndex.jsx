import { useState } from "react";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import AddContact from "./AddContact";
import AddRandomContact from "./AddRandomContact";

function ContactIndex() {
  const [contactList, setContactList] = useState([
    {
      id: 1,
      name: "Aditya-Ozalwar",
      email: "adityaozalwar03@gmail.com",
      phone: 123123123,
      isFavorite: true,
    },
    {
      id: 2,
      name: "Rohan",
      email: "rohan@gmail.com",
      phone: 999888777,
      isFavorite: false,
    },
    {
      id: 3,
      name: "Jason",
      email: "jason@gmail.com",
      phone: 555555555,
      isFavorite: false,
    },
    {
      id: 4,
      name: "Sarah",
      email: "sarah@gmail.com",
      phone: 111222333,
      isFavorite: false,
    },
  ]);

  const [selectedContact, SetSelectedContact] = useState(null);
  const [isUpdating, SetIsUpdating] = useState(false);

  // Fixed: Renamed to handleEditContact to avoid duplicate function name
  function handleEditContact(contact) {
    console.log(contact);
    SetSelectedContact(contact);
    SetIsUpdating(true);
  }

  function handleCancel() {
    SetSelectedContact(null);
    SetIsUpdating(false);
  }

  function handleRemoveAll() {
    setContactList([]);
  }

  function handleToogleFavorite(contact) {
    setContactList((prev) => {
      return prev.map((obj) => {
        if (obj.id == contact.id) {
          return { ...obj, isFavorite: !obj.isFavorite };
        }
        return obj;
      });
    });
  }

  function handleUpdateContact(contact) {
    setContactList((prev) => {
      return prev.map((obj) => {
        if (obj.id == contact.id) {
          return {
            ...obj,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          };
        }
        return obj;
      });
    });

    SetSelectedContact(null);
    SetIsUpdating(false);
    return { success: true, message: "Contact updated successfully!!!" };
  }

  function handleAddContact(newContact) {
    // Form-validation
    const duplicateRecord = contactList.filter((contact) => {
      if (
        newContact.name === contact.name &&
        newContact.email === contact.email
      ) {
        return true;
      }
    });

    if (duplicateRecord.length > 0) {
      return { success: false, message: "Duplicate contact found!" };
    }

    const finalContact = {
      ...newContact,
      id:
        contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1,
      isFavorite: newContact.isFavorite || false,
    };

    setContactList((prev) => prev.concat(finalContact));

    return { success: true, message: "Contact added successfully!!!" };
  }

  function deleteContact(contact) {
    setContactList((prev) => {
      return prev.filter((obj) => obj.id != contact.id);
    });
  }

  return (
    <div className="container" style={{ minWidth: "85vh" }}>
      <div className="row py-3 ">
        <div className="row py-2">
          <div className="col-4">Add Contact</div>
          <div className="col-4">
            <AddRandomContact handleAddContact={handleAddContact} />
          </div>
          <div className="col-4">
            <button
              onClick={handleRemoveAll}
              className="btn btn-danger form-control"
            >
              Remove All
            </button>
          </div>
        </div>

        <div className="py-2">
          <div className="col-12">
            <AddContact
              handleAddContact={handleAddContact}
              handleUpdateContact={handleUpdateContact}
              selectedContact={selectedContact}
              isUpdating={isUpdating}
              cancelClick={handleCancel}
            ></AddContact>
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">Favourite Contact</div>
        </div>
        <div className="py-2">
          <FavoriteContacts
            favoriteClick={handleToogleFavorite}
            deleteClick={deleteContact}
            updateClick={handleEditContact}
            contacts={contactList.filter((u) => u.isFavorite == true)}
          ></FavoriteContacts>
        </div>
        <div className="py-2">
          <div className="col-12">General Contact</div>
          <GeneralContacts
            favoriteClick={handleToogleFavorite}
            deleteClick={deleteContact}
            updateClick={handleEditContact}
            contacts={contactList.filter((user) => user.isFavorite == false)}
          ></GeneralContacts>
        </div>
      </div>
    </div>
  );
}

export default ContactIndex;
