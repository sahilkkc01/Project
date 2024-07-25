 
 
 export const generateUHID = (clinic, city) => {
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format date as YYYYMMDD

    let uhid = `${clinic.substring(0, 3)}${city.substring(0, 3)}${formattedDate}`;
    uhid = uhid.toUpperCase();
    return uhid;
};

