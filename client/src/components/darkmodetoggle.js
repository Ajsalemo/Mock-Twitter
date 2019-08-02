// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { connect } from 'react-redux';

// * Material-UI icons
import { Done } from '@material-ui/icons';

// * Redux actions
import { darkModeOn, darkModeOff } from '../redux/actions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

let DarkModeToggle = props => {
    const { dark_mode } = props;
    return (
        // * If dark mode is toggled on, display an icon to show that it is - else if it isn't, remove the icon
        dark_mode ?
        <span onClick={() => props.darkModeOff()}>Dark mode <Done/></span>
            :
        <span onClick={() => props.darkModeOn()}>Dark mode</span>
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
