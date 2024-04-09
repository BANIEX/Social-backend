import jwt, { Secret, TokenExpiredError } from "jsonwebtoken";

export default class JwtAuth {
  protected secret_key: Secret = "jwt_secret_key";

  // jwt token verifications
  public verifyJWT = (token: string) => {
   
    return jwt.verify(token, this.secret_key) as Record<string, unknown>;
  };

  // create jwt token
  public createJWT = (payload: object): string => {
    console.log(payload);
    console.log(this.secret_key);
    return jwt.sign(payload, this.secret_key, {
      expiresIn: "1 days",
    });
  };


}
