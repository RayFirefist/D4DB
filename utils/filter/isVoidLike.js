export default function isVoidLike(x) {
    if (typeof x === "string") return x.trim() === "";
    if (Array.isArray(x)) return x.length === 0;
    return false;
}
