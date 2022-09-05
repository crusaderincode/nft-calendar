

const isMobile = () => {

    const  userAgent = navigator.userAgent || navigator.vendor;


    if (/android/i.test(userAgent)) {
        return true;
    }


    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return true;
    }

    if (window.innerWidth < 530) {
        return true;
    }

    return false;
}

export default isMobile