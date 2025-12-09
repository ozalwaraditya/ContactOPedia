import { useState } from "react";
import getRandomUser from "../../Utility/api";

function AddRandomContact(props) {
  const [isLoading, setIsLoading] = useState(false);

  const getRandomContact = async () => {
    setIsLoading(true);

    try {
      const result = await getRandomUser();
      console.log(result);

      if (result.success) {
        // Call parent callback to add the contact
        const response = props.handleAddContact(result.data);

        if (!response.success) {
          alert(response.message);
        }
      } else {
        alert(result.message || "Failed to fetch random user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while fetching random user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn btn-success form-control"
      onClick={getRandomContact}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Add Random User"}
    </button>
  );
}

export default AddRandomContact;
