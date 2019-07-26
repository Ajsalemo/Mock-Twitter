// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import moment from 'moment';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

// Function to return the number of minute(s) before a Apollo Query poles again
export const pollMinute = (a, b) => {
    return a * b;
};

// ----------------------------------------------------------------------------------------------------- //
  
// This function replaces the default picture size with a bigger one - the bigger one being a '.jpg' extension
// If the 'profile_banner_url' property on the Schema UserObject returns null, then the function does nothing
export const extractAndReplaceNormalJPG = imageSrc => {
    if(imageSrc !== null) {
        return imageSrc.replace('_normal.jpg', '.jpg');
    } else {
        return;
    }
};

// ----------------------------------------------------------------------------------------------------- //

// Converts the tweets 'created_at' date into a time that displays 'x' amount of time since creation 
export const parseCreatedAtDate = time => {
    return moment(time, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow();
};

// ----------------------------------------------------------------------------------------------------- //

// **This is used to filter links in the app - if a link is appended with a '#', it'll think it's a page
// **Which will end up not being found(404), since its not a real page - redirecting to 'home' everytime, due to React Routers Switch HOC
// If this function finds a '#' as the first character of the string, it will remove the hashtag
// Else - it returns and doesn't modify ones that do not contain it as its first letter
export const removeLeadingHashtag = link => {
    if (link.charAt(0) === '#') {
        return link.substring(1);
    } else {
        return link;
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
  