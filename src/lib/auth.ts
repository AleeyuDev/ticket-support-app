/* eslint-disable @typescript-eslint/no-explicit-any */

// import {logEvent }  from "@utils/sentry"
import {SignJWT, jwtVerify} from 'jose'
import { cookies } from "next/headers"


const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

const cookieName: string = 'auth-token';


export const signAuthToken = async (payload: any ) => {

    try {
        const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime('7d')
        .sign(secret)


   return token
    } catch (error) {

        // logEvent("Token signing failed", 'auth', {payload}, 'error', error)
        console.error( error)
        //  throw new Error("token signing failed", error)
    }
}






export const verifyAuthToken = async  <T>(token: string): Promise<T> => {


    try {
        const {payload}  =  await   jwtVerify(token, secret)

        return payload as T;
    } catch (error) {

        // logEvent(
        //     " Token   description failed "  , 'auth', {tokenSnippet: token.slice(0, 10)}, 'error', error
        // )


        throw new Error('Token description failed')
        console.log( error)

}


}


// set the   auth cookie


export const setAuthCookie  = async (
    token: string) => {


    try {

        const cookieStore = await cookies();
        cookieStore.set(cookieName, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production' ,
            path: "/",
            maxAge: 60 * 60 * 24* 7 // 7 days 
        } )

    } catch (error) {

        console.log(error)

        // logEvent(
        //     'failed to set cookie, 'auth' {token}, 'error', error
        // )


}

}




// Get auth token from cookie 
export const getAuthCookie = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get(cookieName)
    return token?.value;
}



// Remove auth cookie

  export const removeAuthCookie = async () => {

    try {
        const cookieStore = await cookies();
        cookieStore.delete(cookieName)

    } catch (error) {
    

        console.log( "  failed  to remove the auth cookies" ,error)
        
// logEvent(
        //     "  failed  to remove yje auth cookies"  , 'auth', {}, 'error', error
        // )

        
    }
}