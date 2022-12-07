// import axios from "axios";
import axios from "axios";
import AuthService from "./AuthService";

export const config = axios.create({
  // baseURL: "http://172.20.10.4:3000/"
  // baseURL: "http://192.168.10.8:3000/"
  baseURL: "http://192.168.1.107:3000/"
  // baseURL:"http://10.23.43.178:3000/"
});
