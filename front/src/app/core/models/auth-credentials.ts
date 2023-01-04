import {Company} from "./company";

export interface AuthCredentials {
  login: String,
  password: String,
  token: String,
  company: Company,
  agent: object,
  role: String
}
