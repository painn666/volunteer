const API_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from "axios";
import qs from "qs";
async function getAid(params) {}
async function getGalleryImages(limit) {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&order=RANDOM&limit=${limit}`,
    {
      headers: {
        "x-api-key":
          "live_Bsn8PWPCsmtx2KbvuzSbOee3YWK8FQQunu9wDJNhB0nsf0sgox5wS1GQ66OGgXDY",
      },
    }
  );
  const data = await res.json();
  return data;
}
async function getUser() {
  const token = localStorage.getItem("JWTtoken");

  const params = {
    populate: {
      aid_requests: { populate: "*" },
      aid_requests_taken: { populate: "*" },
    },
  };
  const queryString = qs.stringify(params, { encode: false });
  try {
    const response = await axios.get(`${API_URL}/users/me?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}
async function getSelfData(userId, populate) {
  const token = localStorage.getItem("JWTtoken");

  // const queryString = qs.stringify(params, { encode: false });
  try {
    const response = await axios.get(
      `${API_URL}/selfData?userId=${userId}&populate=${populate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}

async function getUserAidRequests(userId) {
  const token = localStorage.getItem("JWTtoken");

  const params = {
    populate: {
      aid_requests: { populate: "*" },
      aid_requests_taken: { populate: "*" },
    },
  };
  const queryString = qs.stringify(params, { encode: false });
  try {
    const response = await axios.get(
      `${API_URL}/users/${userId}?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}
async function getMoneyCollections(userId) {
  const token = localStorage.getItem("JWTtoken");

  const params = {
    populate: {
      titlePicture: { populate: "*" },
    },
  };
  const queryString = qs.stringify(params, { encode: false });
  try {
    const response = await axios.get(
      `${API_URL}/money-collections?${queryString}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    console.log(response);

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}

async function getAllAidRequests() {
  const token = localStorage.getItem("JWTtoken");

  // const queryString = qs.stringify(params, { encode: false });
  try {
    const response = await axios.get(`${API_URL}/AidRequests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}
async function getMapData() {
  try {
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=[out:json];(relation["admin_level"="4"]["name"="Донецька область"];relation["admin_level"="4"]["name"="Луганська область"];relation["admin_level"="4"]["name"="Запорізька область"];);out body;>;out skel qt;`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch map data", error);
  }
}
async function getCities() {
  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?country=UA&featureClass=P&maxRows=1000&username=painn&lang=uk`
    );

    return response.data.geonames;
  } catch (error) {
    console.error("Failed to fetch map data", error);
  }
}
const regionMap = {
  "Луганьска область": "Луганська Область",
  "Донецька область": "Донецька Область",
  "Запорізька область": "Запорізька Область",
  "Херсонська область": "Херсонська Область",
  "Харківська область": "Харківська Область",
  // другие по необходимости
};

async function getCityByName(name, region = null) {
  if (!name) return null;

  const mappedRegion = region ? regionMap[region.toLowerCase()] : null;

  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON`, {
      params: {
        name_equals: name,
        country: "UA",
        featureClass: "P",
        maxRows: 10,
        lang: "uk",
        username: "painn",
      },
    });

    const geonames = response.data.geonames;

    if (!geonames || geonames.length === 0) return null;

    if (mappedRegion) {
      const filtered = geonames.filter(
        (item) => item.adminName1 === mappedRegion
      );
      return filtered.length > 0 ? filtered : null;
    }

    return geonames;
  } catch (error) {
    console.error("Failed to fetch city by name", error);
    return null;
  }
}

async function getQuantityOfAids() {
  try {
    const response = await axios.get(`${API_URL}/quantityOfAids`);
    console.log(response);

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}

async function createAidRequest(userId, data) {
  const token = localStorage.getItem("JWTtoken");

  try {
    const response = await axios.post(
      `${API_URL}/aidRequest`,
      { userId: userId, aidRequest: data }, // данные запроса
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to create aid request", error);
    return error;
  }
}

async function takeAidRequest(userId, aidId) {
  const token = localStorage.getItem("JWTtoken");

  try {
    const response = await axios.put(
      `${API_URL}/TakeAidRequest`,
      { aidId: aidId, userId: userId }, // данные запроса
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to create aid request", error);
    return error;
  }
}
async function completeAidRequest(userId, aidId) {
  const token = localStorage.getItem("JWTtoken");

  try {
    const response = await axios.put(
      `${API_URL}/CompleteAidRequest`,
      { aidId: aidId, userId: userId }, // данные запроса
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to create aid request", error);
    return error;
  }
}
async function createMoneyCollection(userId, collectionData) {
  const token = localStorage.getItem("JWTtoken");

  try {
    let uploadedFileId = null;

    if (collectionData.file instanceof File) {
      const formData = new FormData();
      formData.append("files", collectionData.file);

      for (let pair of formData.entries()) {
        console.log("formData entry:", pair[0], pair[1]);
      }

      try {
        const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        uploadedFileId = uploadRes.data[0]?.id;
      } catch (uploadError) {
        console.warn("Ошибка при загрузке файла:", uploadError);

        // Попытка получить последний файл из медиа, если ошибка 500
        if (uploadError.response?.status === 500) {
          const mediaRes = await axios.get(
            `${API_URL}/upload/files?sort=createdAt:desc&_limit=1`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          uploadedFileId = mediaRes.data[0]?.id;
          console.warn(
            "Попытка взять последний файл из медиа:",
            uploadedFileId
          );
        } else {
          return;
        }
      }
    }

    const payload = {
      userId,
      collectionData: {
        ...collectionData,
        file: uploadedFileId,
      },
    };

    const response = await axios.post(`${API_URL}/moneyCollection`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to create money collection", error);
    return error || 500;
  }
}

async function becomeVolunteer(userId, file) {
  const token = localStorage.getItem("JWTtoken");

  try {
    let uploadedFileId = null;

    if (file?.file instanceof File) {
      const formData = new FormData();
      formData.append("files", file.file);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        uploadedFileId = uploadRes.data[0]?.id;
      } catch (uploadError) {
        console.warn("Ошибка при загрузке файла:", uploadError);

        if (uploadError.response?.status === 500) {
          const mediaRes = await axios.get(
            `${API_URL}/upload/files?sort=createdAt:desc&_limit=1`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          uploadedFileId = mediaRes.data[0]?.id;
          console.warn(
            "Попытка взять последний файл из медиа:",
            uploadedFileId
          );
        } else {
          return;
        }
      }
    }

    const payload = {
      userId,
      volunteerFile: uploadedFileId,
    };

    const response = await axios.post(`${API_URL}/becomeVolunteer`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to become volunteer", error);
    return error || 500;
  }
}

async function cancelAidRquest(userId, aidId) {
  const token = localStorage.getItem("JWTtoken");
  console.log(userId, aidId);

  try {
    const response = await axios.delete(
      `${API_URL}/cancelAidRequest?aidId=${aidId}&userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to create aid request", error);
    return error;
  }
}

async function getMedia(params) {
  try {
    const response = await axios.get(`${API_URL}/galleryOfAids`);
    console.log(response);

    return response;
  } catch (error) {
    // console.error("Failed to update user data", error);
    return error;
  }
}

export {
  getAid,
  getGalleryImages,
  getUser,
  getMedia,
  getMapData,
  getCities,
  createAidRequest,
  getUserAidRequests,
  getSelfData,
  getAllAidRequests,
  takeAidRequest,
  completeAidRequest,
  getQuantityOfAids,
  createMoneyCollection,
  getMoneyCollections,
  becomeVolunteer,
  cancelAidRquest,
  getCityByName,
};
