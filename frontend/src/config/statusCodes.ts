import { StatusCodes } from '../types/statusCode';

export const statusCodes: StatusCodes = {
  "400": {
    name: "Bad Request",
    content: ""
  },
  "404": {
    name: "Not found",
    content: "Sorry, the page you visited does not exist."
  },
  "429": {
    name: "Too Many Requests",
    content: ""
  },
  "500": {
    name: "Internal Server Error",
    content: ""
  }
}