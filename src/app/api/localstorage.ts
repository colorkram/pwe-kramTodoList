export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";
export const User_Data = "UserData";
export const LISTDATA = "LISTDATA";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  return null;
};

export const getReAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_ACCESS_TOKEN);
  }
  return null;
};

export const getUserData = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(User_Data);
  }
  return null;
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};
export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(REFRESH_ACCESS_TOKEN, refreshToken);
};
export const setUserData = (data: object) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem("Userdata", jsonData);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  // return window.location.href = "/";
};


export const getData= () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LISTDATA);
  }
  return null;
};

export const setData = (data: string) => {
  localStorage.setItem(LISTDATA, data);
};