import React from 'react';
import classNames from 'classnames';
import './Umbrella.css';
import { UmbrellaMapping } from '../../constants';
import Loader from '../loader';
import mergeImages from '../../utils/MergeImages';
//dimensions of the umbrella image
const dimensions = { height: 406, width: 451 };
//custom hook to keep track of previous prop values
export const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const Umbrella = ({ color, logo, toggleUploadIcon }) => {
  // state variables to keep track of image loading and src of umbrella image
  const [imageLoading, setImageLoading] = React.useState(false);
  const [src, setSrc] = React.useState(UmbrellaMapping[color]);
// class names for umbrella image
  const UmbrellaImageClass = classNames({
    ['Umbrella-image']: true,
    ['d-none']: imageLoading, //hides the image whe you are loading
  });
//class name for laoding spinner
  const LoaderClass = classNames({
    ['Umbrella-loading']: imageLoading,
    ['d-none']: !imageLoading // hides the image upon loading
  });

  // Merge Umbrella Image and Logo
  const updateUmbrellaLogo = () => {
    const width = dimensions.width * 0.25;
    const height = dimensions.height * 0.1;
//call mergeImages utility func to merge umbrella and logo images
    mergeImages([
      { src: UmbrellaMapping[color], x: 0, y: 0 },
      { src: logo, x: width / 2.0, y: height, logo: true, h: height, w: width },
    ], {
      height: dimensions.height,
      width: dimensions.width
    })
      .then(b64 => {
        setSrc(b64);//set src of umbrella image to the merged image
        setImageLoading(false);
        toggleUploadIcon(false);
      });
  }
// useEffect hook to update umbrella and logo when color or logo prop changes
  React.useEffect(() => {
    if (logo !== null) {//if logo prop is not null
      toggleUploadIcon(true); //shows upload icon
      setImageLoading(true);// set imageLoading to true to show loading spinner
      setTimeout(updateUmbrellaLogo, 3000); //calls after 3 secs
    } else {
      setSrc(UmbrellaMapping[color]);
      // if logo prop is null, set src to the corresponding color from UmbrellaMapping
    }
  }, [logo, color]);
//render the umbrella component
  return (
    <div className='Umbrella'>
      <img
        className={UmbrellaImageClass}
        src={src}
      />
      <Loader fill={color} className={LoaderClass} />
    </div>
  );
};

export default Umbrella;