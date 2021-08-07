export default function timestampToString(timestamp) {
    if (timestamp < 1602860400)
        timestamp = 1602860400
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};