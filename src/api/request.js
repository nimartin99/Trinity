const getRequest = (url) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// Normal http(s) address of your backend
const getBackendAddress = () => {
    if(!process.env.VUE_APP_BACKEND_ADDRESS) {
        console.warn("VUE_APP_BACKEND_ADDRESS not defined. Have set up your .env?")
    }
    if(process.env.VUE_APP_BACKEND_ADDRESS === 'PRODUCTION_BACKEND_ADDRESS') {
        return `https://${window.location.host}/backend`
    }
    return process.env.VUE_APP_BACKEND_ADDRESS;
}

export {
    getRequest,
};
