// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import moment from 'moment';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
// Function to return the number of minute(s) before a Apollo Query poles again

export const pollMinute = (a, b) => {
    return a * b;
};
  
// This function replaces the default picture size with a bigger one - the bigger one being a '.jpg' extension
// If the 'profile_banner_url' property on the Schema UserObject returns null, then the function does nothing
export const extractAndReplaceNormalJPG = imageSrc => {
    if(imageSrc !== null) {
        return imageSrc.replace('_normal.jpg', '.jpg');
    } else {
        return;
    }
};

// Converts the tweets 'created_at' date into a time that displays 'x' amount of time since creation 
export const parseCreatedAtDate = time => {
    return moment(time, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow();
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
  