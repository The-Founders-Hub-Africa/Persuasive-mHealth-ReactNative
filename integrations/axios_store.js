import axios from "axios";
import { baseUrl } from "./features/apis/apiSlice";

export const get_id = (param) => param.id;
export const get_name = (param) => param.name;

export const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

export const search_name = (fullname, name) => {
  fullname = fullname.toLocaleLowerCase();
  name = name.toLocaleLowerCase();
  return fullname.indexOf(name) > -1;
};

export const convertDate = (dateStr) => {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [day, month, year] = dateStr.split("/");
  return `${year}-${months[month]}-${day.padStart(2, "0")}`;
};


export const getPatientAgeGroups = (patients) => {
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      return 0;
    }

    const birthDate = new Date(convertDate(dateOfBirth));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const childrenCount = patients.filter((patient) => {
    let age = calculateAge(patient.date_of_birth);
    return age && age < 13;
  }).length;
  const teenageCount = patients.filter((patient) => {
    const age = calculateAge(patient.date_of_birth);
    return age && age >= 13 && age <= 18;
  }).length;
  const adultCount = patients.filter((patient) => {
    let age = calculateAge(patient.date_of_birth);
    return age && age > 18;
  }).length;

  return { childrenCount, teenageCount, adultCount };
};

let user_url = `${baseUrl}/edituser`;
let appointments_url = `${baseUrl}/event`;
let patient_url = `${baseUrl}/patient`;

const base64ToBlob = (base64, type) => {
  const binary = atob(base64.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  return new Blob([new Uint8Array(array)], { type });
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

  const getBase64Image = async (uri) => {
    let base64Image = await fetch(uri)
      .then((response) => response.blob())
      .catch((error) => {
        console.error("Error fetching image:", error);
        return null;
      });
    return base64Image;
  };

const createForm = async (data, blob_name) => {
  let needed = data.data;
  let formdata = new FormData();
  console.log("needed", needed);
  console.log("blob_name", blob_name);
  for (const [key, value] of Object.entries(needed.formdata)) {
    if (key == blob_name && value) {
      let first_four = value.slice(0, 4);
      if (first_four !== "http") {
        console.log("value", value);
        console.log('key', key);
        formdata.append(key,{uri: value,
           type: needed.img.type, 
          name: needed.img.filename});
      }

      // formdata.append(key, value,needed.img.filename)
    } else if (key != blob_name) {
      if (key != "name") {
        formdata.append(key, value);
      }
    }
  }
  return formdata;
};

export const UserProfile = async (data) => {
  console.log("inside user profile", data);
  let formdata = await createForm(data, "image");
  console.log("formdata", formdata);
  return axios
    .post(user_url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${data.token}`,
      },
    })
    .then((res) => {
      console.log("res", res);
      return {
        data: res.data,
        success: true,
        status: res.status,
      };
    })
    .catch((err) => {
      console.log("err", err[0]);
      return {
        type: "Error",
        success: false,
        data: err.response.data,
        status: err.status,
      };
    });
};

export const Appointments = async (data) => {
  let formdata = await createForm(data, "document");
  return axios
    .post(appointments_url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${data.token}`,
      },
    })
    .then((res) => {
      return {
        data: res.data,
        success: true,
        status: res.status,
      };
    })
    .catch((err) => {
      return {
        type: "Error",
        success: false,
        data: err.response.data,
        status: err.status,
      };
    });
};

export const Patients = async (data) => {
  let formdata = await createForm(data, "document");
  return axios
    .post(patient_url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${data.token}`,
      },
    })
    .then((res) => {
      return {
        data: res.data,
        success: true,
        status: res.status,
      };
    })
    .catch((err) => {
      // console.log('patient err',err.response.data)
      return {
        type: "Error",
        success: false,
        data: err.response.data,
        status: err.status,
      };
    });
};

export const axiosGetMediaFile = async (file_id, token) => {
  const imageUrl = `${baseUrl}/platforms/get_media/${file_id}`;
  console.log("url", imageUrl);
  return axios
    .get(imageUrl, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return {
        data: res.data,
        success: true,
        status: res.status,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err.response.data,
        status: err.status,
      };
    });
};

export const axiosGetNgrokMediaFile = async (url, file_id, token) => {
  // const imageUrl = `${url}/platforms/get_media/${file_id}`;
  const imageUrl = `${url}`;
  console.log("url_", imageUrl);
  return axios
    .get(imageUrl, {
      // responseType: 'blob',
      headers: {
        // 'Authorization': `Token ${token}`,
        // "Content-Type": "application/json",
        // "ngrok-skip-browser-warning": "102",
      },
    })
    .then((res) => {
      return {
        data: res.data,
        success: true,
        status: res.status,
      };
    })
    .catch((err) => {
      console.log("err", err);
      return {
        success: false,
        data: err.response?.data || err.message,
        status: err.response?.status || 500,
      };
    });
};
