export function encodeData(data: {[key: string]: string}) {
    return Object.keys(data).map((key) => {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}
