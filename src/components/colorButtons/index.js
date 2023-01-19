import React from 'react';
import './ColorButtons.css';
import classNames from 'classnames';
import { colors } from '../../constants';

const ColorButtons = ({ color, onChangeColor }) => {
// getColorButtonClass function returns a string of class names
  const getColorButtonClass = (umbrellaColor) => {
    return classNames({
            // always apply 'Color-swatch' class
      ['Color-swatch']: true,
      // apply 'Color-swatch--' + umbrellaColor if umbrellaColor is truthy
      [`Color-swatch--${umbrellaColor}`]: umbrellaColor,
            // apply 'Color-active--' + color if color prop is equal to umbrellaColor
      [`Color-active--${color}`]: color === umbrellaColor
    });
  }

  return (
    <div className='Swatch'>
      {// map over the colors array and return a span element for each color
        colors.map(umbrellaColor => (
          <span   // set key attribute to current color
            key={umbrellaColor}// set className attribute to return value of getColorButtonClass
            className={getColorButtonClass(umbrellaColor)}
            onClick={(event) => onChangeColor(event, umbrellaColor)}
            // set onClick attribute to a callback function that calls onChangeColor and passes in the event object and current color
          >
          </span>
        ))
      }
    </div>
  );
};

export default ColorButtons;