"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/compat/app");
require("firebase/compat/firestore");
var clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
if (!app_1.default.apps.length) {
    app_1.default.initializeApp(clientCredentials);
}
exports.default = app_1.default;
//# sourceMappingURL=clientApp.js.map