function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    for (let i = 0; i < cArr.length; i++) {
        let val = cArr[i];
        if (val.indexOf(name) === 0) {
            return val.substring(name.length);
        }
    }
    return null;
}

function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "Expires=" + date.toUTCString();
    document.cookie = cName + "=" + JSON.stringify(cValue) + "; " + expires + "; Path=/; Domain=.start2impact.it;";
}

function setUtmCookie() {
    let cName = 'utm_parameters';
    let url = new URL(window.location);
    let search_params = url.searchParams;
    let utm_campaign = search_params.get('utm_campaign');
    let utm_medium = search_params.get('utm_medium');
    let utm_source = search_params.get('utm_source');
    let referrer = document.referrer;
    let expDays = 30;
    let landed_at = new Date().toLocaleString();
    let cValue = { utm_campaign, utm_medium, utm_source, landed_at, referrer };

    if (utm_campaign || utm_medium || utm_source) {
        if (!(utm_campaign && utm_medium && utm_source)) {
            console.warn('UTM parameters missing:', { utm_campaign, utm_medium, utm_source });
        }
        let existingValue = JSON.parse(getCookie(cName));
        if (existingValue) {
            existingValue.push(cValue);
            setCookie(cName, existingValue, expDays);
        } else {
            setCookie(cName, [cValue], expDays);
        }
    }
}

setUtmCookie();
