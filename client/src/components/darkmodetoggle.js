// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { connect } from 'react-redux';

// * Material-UI icons
import { BrightnessHigh, BrightnessLow } from '@material-ui/icons';

// * Redux actions
import { darkModeOn, darkModeOff } from '../redux/actions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

let DarkModeToggle = props => {
    const { dark_mode, darkModeFont } = props;
    return (
        // * If dark mode is toggled on, display an icon to show that it is - else if it isn't, remove the icon
        dark_mode ?
        // ! Inline styles are used for dark mode
        <span onClick={() => props.darkModeOff()} style={{ color: darkModeFont }}>Dark mode <BrightnessHigh /></span>
            :
        // ! Inline styles are used for dark mode
        <span onClick={() => props.darkModeOn()} style={{ color: darkModeFont }}>Dark mode <BrightnessLow /></span>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    }
};

// ----------------------------------------------------------------------------------------------------- //

DarkModeToggle = connect(
    mapStateToProps,
    { darkModeOn, darkModeOff }
)(DarkModeToggle);

// ----------------------------------------------------------------------------------------------------- //

export default DarkModeToggle;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
