export const createNewUser = async (url, dataToServer) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToServer),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error at createNewUser:", error.message);
  }
};

export const getUsersInfo = async (url) => {
  try {
    const response = await fetch(url);
    const personalData = await response.json();

    return personalData;
  } catch (error) {
    console.error("Error fetching data at getUsersInfo:", error);
  }
};

export const updateUserInfo = async (url, userId, data) => {
  try {
    const response = await fetch(`${url}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error at updateUserInfo:", error);
  }
};

export const deleteUser = async (url, userId) => {
  try {
    const response = await fetch(`${url}/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error at deleteUser:", error.message);
  }
};

// DATABASE
export const saveDataToDB = (data) => {
  const jsonString = JSON.stringify(data);
  localStorage.setItem("usersDatabase", jsonString);
};

export const loadDataFromDB = () => {
  const storedJsonString = localStorage.getItem("usersDatabase");
  if (storedJsonString) {
    return JSON.parse(storedJsonString);
  }
};
