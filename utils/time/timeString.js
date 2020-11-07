export default function timestampToString(timestamp) {
    //console.log(timestamp, 1601434800000)
    if (timestamp < 1602860400)
        timestamp = 1602860400
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};