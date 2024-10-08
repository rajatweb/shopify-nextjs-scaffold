import { DeliveryMethod, Session } from "@shopify/shopify-api";
import { setupGDPRWebHooks } from "../../helpers/gdpr";
import shopify from "./shopify-init";

let webhooksInitialized = false;

export function addHandlers() {
    if (!webhooksInitialized) {
        webhooksInitialized = true;
        setupGDPRWebHooks("/api/webhooks");
        shopify.webhooks.addHandlers({
            ["APP_UNINSTALLED"]: {
                deliveryMethod: DeliveryMethod.Http,
                callbackUrl: "/api/webhooks",
                callback: async (_topic, shop) => {
                    console.log("Uninstalled app from shop: " + shop);
                },
            },
        });
        console.log("Added handlers");
    } else {
        console.log("Handlers already added");
    }
}

export async function registerWebhooks(session: Session) {
    addHandlers();
    const responses = await shopify.webhooks.register({ session });
    console.log("Webhooks added", responses);
}