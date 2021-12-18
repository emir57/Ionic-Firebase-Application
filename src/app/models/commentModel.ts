import { User } from "./user";

export interface CommentModel extends Comment{
  user:User
}
