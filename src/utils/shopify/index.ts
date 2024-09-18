import { Session } from "@shopify/shopify-api";

export const getSessionFromStorage = () => {
    const session = localStorage.getItem("session")!
    const sessionObj = JSON.parse(session) as Session;
    return sessionObj;
}
