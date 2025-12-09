const getRandomUser = async () => {
  try {
    const url = "https://randomuser.me/api/";
    const response = await fetch(url);

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const user = data.results[0];

    return {
      success: true,
      data: {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        image: user.picture.large,
        isFavorite: false,
        gender: user.gender,
        age: user.dob.age,
        location: `${user.location.city}, ${user.location.country}`,
        thumbnail: user.picture.thumbnail,
      },
    };
  } catch (error) {
    console.error("Error fetching random user:", error);
    return {
      success: false,
      message: "Failed to fetch random user",
      error: error.message,
    };
  }
};

export default getRandomUser;
