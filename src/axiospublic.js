import axios from "axios";
import { baseUrl } from "./publicvariables";

const publicapi = axios.create({
  baseURL: baseUrl,
});
export default publicapi;
