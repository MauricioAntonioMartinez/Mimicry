import { User, UserAttrs, UserSchema } from "./User";

UserSchema.static("build", (attrs: UserAttrs) => {
  return new User(attrs);
});
 