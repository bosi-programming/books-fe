const isDevelopment = /localhost/.test(window.location as unknown as string);

const constants = {
  baseUrl: isDevelopment ? "http://localhost:8002/api" : "https://content-manager-backend.herokuapp.com/api",
};

export default constants;
