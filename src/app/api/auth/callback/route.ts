/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import shopify from "@/lib/shopify/shopify-init";
import {
    CookieNotFound,
    InvalidOAuthError,
    InvalidSession,
    Session,
} from "@shopify/shopify-api";
import { NextResponse } from "next/server";
import { beginAuth } from "../auth";
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage('./localData');

// Function to verify HMAC
const verifyHmac = (query: URLSearchParams, secret: string): boolean => {
    const hmac = query.get('hmac') || '';
    const map = Object.fromEntries(query.entries());

    // Remove hmac from the map
    delete map['hmac'];

    // Sort the parameters
    const message = Object.keys(map)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => `${key}=${map[key]}`)
        .join('&');

    // Create HMAC digest
    const generatedHmac = crypto
        .createHmac('sha256', secret)
        .update(message)
        .digest('hex');

    return generatedHmac === hmac;
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get("shop");
    const host = searchParams.get("host");
    // const code = searchParams.get("code");
    // const hmac = searchParams.get("hmac");

    // Verify HMAC using the shared secret from your Shopify app settings
    const isValid = verifyHmac(searchParams, process.env.SHOPIFY_API_SECRET || '');

    if (!isValid) {
        return NextResponse.json({ error: 'Invalid HMAC' }, { status: 403 });
    }

    if (!shop) {
        throw new Error("No shop provided");
    }

    try {
        const callbackResponse = await shopify.auth.callback<Session>({
            rawRequest: req,
        });

        const { session } = callbackResponse;

        if (!session || !session.accessToken) {
            throw new Error("Could not validate auth callback");
        }

        localStorage.setItem('session', JSON.stringify(session));

        await shopify.webhooks.register({ session });

        const sanitizedHost = shopify.utils.sanitizeHost(host || "");
        if (!host || host == null) {
            return new NextResponse("Missing host parameter", { status: 400 });
        }

        let redirectUrl = `http://localhost:3000/?shop=${session.shop}&host=${encodeURIComponent(sanitizedHost!)}`;
        if (shopify.config.isEmbeddedApp) {
            redirectUrl = await shopify.auth.getEmbeddedAppUrl({
                rawRequest: req,
                rawResponse: new NextResponse(),
            });
        }

        return NextResponse.redirect(redirectUrl);
    } catch (e: any) {
        console.warn(e);
        switch (true) {
            case e instanceof InvalidOAuthError:
                return new NextResponse(e.message, { status: 403 });
            case e instanceof CookieNotFound:
            case e instanceof InvalidSession:
                // This is likely because the OAuth session cookie expired before the merchant approved the request
                return beginAuth(shop!, req, false);
            default:
                return new NextResponse("An error occurred", { status: 500 });
        }
    }
}