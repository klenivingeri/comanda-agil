export const setCookie = (token) => {
  console.log(token);
  document.cookie = `ml2=${token}; path=/; max-age=3600; samesite=strict`;
};

export const getCookie = (name) => {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
