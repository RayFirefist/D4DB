export default function isDarkModeEnabled() {
    if (process.browser) {
        let temp = localStorage.getItem("settings")
        if (temp === null)
            return false;
        temp = JSON.parse(temp)
        return temp.theme === "dark"
    } else {
        return false;
    }
}