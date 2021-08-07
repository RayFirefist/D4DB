export let config = [
    {
        cdnKey: "ja",
        cdnAddress: "https://api.gurumiku.makoo.eu/assets/",
        cdnL10n: "CDN_JAPANESE"
    },
    {
        cdnKey: "en",
        cdnAddress: "https://api.gurumiku.makoo.eu/assets_en/",
        cdnL10n: "CDN_ENGLISH"
    },
    {
        cdnKey: "localhost",
        cdnAddress: "https://0.0.0.0:3001/assets/",
        cdnL10n: "CDN_LOCALHOST",
        cdnDevOnly: true
    },
]