"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function sha1(message) {
    return __awaiter(this, void 0, void 0, function* () {
        //https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);
        // hash the message
        const hashBuffer = yield crypto.subtle.digest('SHA-1', msgBuffer);
        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        // convert bytes to hex string
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        return hashHex;
    });
}
function fetchAsync(code) {
    return __awaiter(this, void 0, void 0, function* () {
        // await response of fetch call
        let response = yield fetch(`https://api.pwnedpasswords.com/range/${code}`);
        // only proceed once promise is resolved
        let data = yield response.text();
        // only proceed once second promise is resolved
        return data;
    });
}
function pwnlookup(password) {
    return __awaiter(this, void 0, void 0, function* () {
        let hash = yield sha1(password);
        let foundpasses = yield fetchAsync(hash.slice(0, 5));
        foundpasses.split("\n").map((p) => p.split(":")[0]).includes(hash.toUpperCase());
    });
}
