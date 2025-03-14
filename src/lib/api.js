import axios from "axios";
import { dataHeader } from "./helper";

console.log("API URL:", process.env.REACT_APP_API_URL);

// START OF USER API
export const register = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_API_URL+"/register", data, dataHeader())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};


export const login = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_API_URL+"/login", data, dataHeader())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};
export const getUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/user", 
        {
          params: data,
          ...dataHeader()
        })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getUsers = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/users", 
        {
          params: data,
          ...dataHeader()
        })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateUserData = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.REACT_APP_API_URL+"/user", data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getPendingUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/user/approve", dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(process.env.REACT_APP_API_URL+"/user", 
        {
          data, 
          ...dataHeader()
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const approveUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.REACT_APP_API_URL+"/user/approve", data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// END OF USER API

//STATUS API
export const getUserStatus = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/status", {
        params : data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addUserStatus = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.REACT_APP_API_URL+"/status", data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const removeUserStatus = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(process.env.REACT_APP_API_URL+"/status", {
        data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//END OF STATUS API

//CATEGORY API
export const getCategory = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/category", {
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const addCategory = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_API_URL+"/category", data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const deleteCategory = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(process.env.REACT_APP_API_URL+"/category", 
        {
          data,
          ...dataHeader()
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateCategory = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.REACT_APP_API_URL+"/category", data, dataHeader()
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//END OF CATEGORY API


//ANALYSIS API
export const getAnalysis = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/analysis", {
        params : data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getStudentsCount = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/countStudents", {
        params : data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getBatches = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/batch", {
        params : data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getStudentsData = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/studentdata", {
        params : data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getBatchData = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API_URL+"/batchdata", {
        params : data, 
        ...dataHeader()
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//END OF ANALYSIS API