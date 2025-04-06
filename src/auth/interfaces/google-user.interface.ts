export interface GoogleUser {
    email: string,
    firstName: string,
    accessToken: string
}
  
export interface ReqGoogleUser {
    user: GoogleUser
}