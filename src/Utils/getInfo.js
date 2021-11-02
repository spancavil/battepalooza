export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
        )
    ) {
        return "Mobile";
    }
    return "Desktop";
};

export const getBrowser = () => {
    const { userAgent } = navigator;
    let browser = "";

    if (userAgent.includes('Firefox/')) {
        // Firefox
        browser = `Firefox`;

    } else if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
        browser = "Opera";

    } else if (userAgent.includes('Edg/')) {
        // Edge (Chromium)
        browser = `Edge`;
        
    } else if (userAgent.indexOf("MSIE") > -1) {
        browser = "Microsoft Internet Explorer";

    } else if (userAgent.includes('Chrome/')) {
        browser = `Chrome`;
    
    } else if (userAgent.includes('Safari/')) {
        browser = `Safari`;
    }

    return browser;
}

export const isMobile = () => {
    return getDeviceType() === "Mobile" ? true : false
}

export const isDesktop = () => {
    return getDeviceType() === "Desktop" ? true : false
}

export const getOS = () => {
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!== -1) 
    {return("Windows 10");}

    if (window.navigator.userAgent.indexOf("Windows NT 6.3") !== -1) 
    {return("Windows 8.1");}

    if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) 
    {return("Windows 8");}

    if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) 
    {return("Windows 7");}

    if (window.navigator.userAgent.indexOf("Windows") !== -1) 
    {return("Windows");}

    if (window.navigator.userAgent.indexOf("Mac") !== -1) 
    {return("Mac/iOS");}

    if (window.navigator.userAgent.indexOf("X11") !== -1) 
    {return("UNIX/Linux");}

    if (window.navigator.userAgent.indexOf("Linux")!== -1) 
    {return("Linux");}

    return "Unknown OS";
} 