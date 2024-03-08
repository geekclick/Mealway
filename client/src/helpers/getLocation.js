export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve([latitude, longitude]);
                },
                (error) => {
                    reject(error.message);
                }
            );
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    });
};


// export const getLocation = async () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;
//                 return [latitude, longitude];
//             },
//             (error) => {
//                 console.log(error.message);
//             }
//         );
//     } else {
//         console.log('Geolocation is not supported by this browser.');
//     }
// };
