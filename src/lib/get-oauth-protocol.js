export default function getOauthProtocol (protocol) {
    if (protocol === "ws:" || protocol === "http:") {
        return "http:";
    } else if (protocol === "wss:" || protocol === "https:") {
        return "https:";
    }
}
