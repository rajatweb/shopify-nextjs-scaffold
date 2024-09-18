import "@shopify/shopify-api/adapters/web-api";
import {
    shopifyApi,
    LATEST_API_VERSION,
    LogSeverity,
} from "@shopify/shopify-api";

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY || "",
    apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
    scopes: process.env.SHOPIFY_API_SCOPES?.split(",") || ["read_products", "write_products"],
    hostName: process.env.HOST_NAME || "localhost:3000",
    hostScheme: "http",
    isEmbeddedApp: false,
    apiVersion: LATEST_API_VERSION,
    logger: {
        level:
            process.env.NODE_ENV === "development"
                ? LogSeverity.Debug
                : LogSeverity.Error,
    },
});

export default shopify;