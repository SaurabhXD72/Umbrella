import React from 'react';
import classNames from 'classnames';
import './index.css';
import Umbrella from './umbrella';
import ColorButtons from './colorButtons';
import UploadIcon from '../ammo/UploadIcon.svg';
import Loader from '../ammo/Loader.svg'

const CustomizeUmbrella = () => {
  //state to keep track of the current color of umbrella
  const [color, setColor] = React.useState('blue');
  //state to keep track of if file is loading
  const [fileLoading, setFileLoading] = React.useState(false);
  //state to keep track of if upload button is loading
  const [uploadButtonLoading, setUploadButtonLoading] = React.useState(false);
  //state to keep track of the file's that been uploaded
  const [file, setFile] = React.useState(null);
  //state to keep the track of file name
  const [fileName, setFileName] = React.useState('');
//reference for the file input element
  const InputRef = React.createRef();
//utility class names for the umbrella container
  const UmbrellaClass = classNames({
    ['Row']: true,
    [`Row--${color}`]: color,
  });
//utility class names for the umbrella icon
  const UploadIconClass = classNames({
    ['Upload-icon']: true,
    ['Upload-icon-loading']: fileLoading || uploadButtonLoading
  })
//utility class names for the upload button
  const UploadButtonClass = classNames({
    ['Upload-Button']: true,
    [`Upload-Button--${color}`]: color
  });
//utility class name for thr close icon
  const CloseIconClass = classNames({
    ['material-icons']: true,
    ['Close-icon']: true,
    ['Close-icon--visible']: fileName !== '',
  });
 // Handler for when user selects a color
  const onChangeColor = (e, umbrellaColor) => {
    setColor(umbrellaColor);
  };
  // Handler for when user uploads a file
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    e.target.value = null;

    setFileLoading(true);
    setTimeout(() => {
      setFileName(file.name);
      setFileLoading(false);
      setFile(URL.createObjectURL(file));
    }, 1000);
  };
  // Handler for when the upload icon should be visible
  const onToggleUploadIcon = (loading) => {
    setUploadButtonLoading(loading);
  }
  // Handler for when user removes the logo
  const onRemoveLogo = () => {
    setFile(null);
    setFileName('');
  }
  // Handler for when user uploads a logo
  const onUploadLogo = () => {
    if (uploadButtonLoading || fileLoading) return;
    InputRef && InputRef.current.click();
  }

  return (
    <div className={UmbrellaClass}>
      <div className='Col Col--6 Col--s-12 Col--xs-12' >
        <Umbrella logo={file} color={color} toggleUploadIcon={onToggleUploadIcon}/>
      </div>
      <div className='Col Col--6 Col--s-12 Col--xs-12'>
        <div className='Info-wrapper'>
          <h1 className='Heading'>Custom Umbrella</h1>
          <ColorButtons color={color} onChangeColor={onChangeColor} />
          <p className='Text Text--strong'>Customize your umbrella</p>
          <p className='Text Text--subtle'>Upload a logo for an instant preview</p>
          <p className='Text Text--small Text--subtle'>.png and .jpg file only. Max file size is 5MB.</p>
          <div className='Upload'>
            <input
              type="file"
              ref={InputRef}
              onChange={onChangeFile}
              accept="image/x-png,image/gif,image/jpeg,image/jpg"
              style={{ display: 'none' }}
            />
            <div className={UploadButtonClass}>
              <img
                src={fileLoading || uploadButtonLoading ? Loader : UploadIcon}
                onClick={onUploadLogo}
                className={UploadIconClass} />
              <p className='Text--strong Text--ellipsis'>{fileName ? fileName : 'UPLOAD LOGO'}</p>
              <div className='Upload-close'>
                <i className={CloseIconClass} onClick={onRemoveLogo}>close</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeUmbrella;