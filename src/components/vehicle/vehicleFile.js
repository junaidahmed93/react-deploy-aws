import React from 'react';
import TextField from 'material-ui/TextField';
import { EditorModeEdit } from 'material-ui/svg-icons';
import jquery from 'jquery';
import ImageCompressor from '../../utils/image-compressor';

const options = {
  quality: 0.5,
  height: 800,
  width: 800,

};

export default class VehicleFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      classNames: `file-grid ${this.props.customStyle}`,
      imageSource: '',
      previewClass: 'preview',
    };
  }
  onChange = (object) => {
    const previewVisible = 'preview show';
    let imageSource = '';

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const file = object.target.files[0];
      if (!file.type.match('image.*')) {
        alert('File is not valid image type.');
        console.error('File is not valid image type.');
        return;
      }

      const imageCompressor = new ImageCompressor();
      imageCompressor.compress(file, options)
        .then((result) => {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            imageSource = reader.result;
            this.setState({
              previewClass: previewVisible,
              imageSource,
            });
            this.props.setValue(this.props.id, imageSource);
          };
        })
        .catch(() => {
        });
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  };
  openFileExplorer = (object) => {
    object.preventDefault();
    jquery(`#${this.props.id}`).trigger('click');
  };
  onPencilClick = (object) => {
    object.preventDefault();
    jquery(`#${this.props.id}`).val('').trigger('click');
  };
  render() {
    return (
      <div className="form-field">
        <TextField
          id={this.props.id}
          type="file"
          value={this.state.value}
          onChange={this.onChange}
          className="file-field"
        />
        <div className={this.state.classNames} onClick={this.openFileExplorer}>
          {this.props.children}
        </div>
        <div className={this.state.previewClass}>
          <EditorModeEdit className="pencil" onClick={this.onPencilClick} />
          <img src={this.state.imageSource} alt="preview" />
          <span onClick={this.onPencilClick} className="pencil-bar">
            <EditorModeEdit className="pencil-inside" />
            Edit Profile
          </span>
        </div>
      </div>
    );
  }
}
