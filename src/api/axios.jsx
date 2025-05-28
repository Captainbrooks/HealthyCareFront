import axios from "axios";


axios.defaults.withCredentials= true;

const getCookie=(name)=>{
    const value=`; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(`;`).shift();
    return null;
}


const axiosClient = axios.create({
    baseURL:'/api',
    headers:{
        'Content-Type':'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config)=>{
        const csrfToken = getCookie('csrftoken');
        if (!['get', 'head', 'options'].includes(config.method)) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient