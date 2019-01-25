// //Functional Component Route
// import React from 'react';
// import { Button, Form, Popup } from 'semantic-ui-react';
// // import { connect } from "react-redux";
// // import { handleFileUpload } from "../actions";

// const FileDrop = props => {
//   return (
//     <Form.Field>
//       <input
//         type="file"
//         name="myFile"
//         onChange={props.handleInputSelectedFile}
//       />
//       <Popup
//         trigger={
//           <Button
//             onClick={props.handleFileUpload}
//             style={{ marginTop: '15px' }}
//           >
//             Upload Image
//           </Button>
//         }
//         content={
//           props.selectedFile
//             ? 'Image Upload completed!'
//             : 'No image was uploaded.'
//         }
//         on="click"
//       />
//     </Form.Field>
//   );
// };

// export default FileDrop;
// // const mapStateToProps = state => {
// //   return {};
// // };
// // export default connect(
// //   mapStateToProps,
// //   { handleFileUpload }
// // )(FileDrop);

import React, { Component } from 'react';
// import { Button, Form, Popup } from 'semantic-ui-react';
import FileDropFunc from './FileDropFunc';

class DragAndDropFile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      file: null,
    };
  
  
  }
  
dragLeaveListener = ev => {
  this.overRideEventDefaults(ev);
  this.dragEventCounter--;

  if(this.dragEventCounter === 0) {
    this.setState({dragging: false});
  }
};

dropListener = ev => {
  this.overRideEventDefaults(ev);
  this.dragEventCounter = 0;
  this.setState({dragging:false});

  if(ev.dataTransfer.files && ev.dataTransfer.files[0]) {
    this.setState({file: ev.dataTransfer.files[0]});

  }
};

overRideEventDefaults = ev => {
  ev.preventDefault();
  ev.stopPropagation();

};

onSelectFileClick = () => {
  this.fileUploaderInput && this.fileUploaderInput.click();
};
  
onFileChange = ev => {
  if (ev.target.files && ev.target.files[0]) {
    this.setState({file:ev.target.files[0]});
  }
};

componentDidMount() {
  window.addEventListener("dragover", ev  => {
    this.overRideEventDefaults(ev);
  });
  window.addEventListener('drop', ev => {
    this.overRideEventDefaults(ev);
  });
}

componentWillMount() {
  window.removeEventListener('dragover', this.overRideEventDefaults);
  window.removeEventListener('drop', this.overRideEventDefaults);

}


render(props) {
  return (
    <FileDropFunc
      dragging={this.state.dragging}
      file={this.state.file}
      onSelectFileClick={this.onSelectFileClick}
      onDrag={this.overRideEventDefaults}
      onDragStart={this.overRideEventDefaults}
      onDragEnd={this.overRideEventDefaults}
      onDragOver={this.overRideEventDefaults}
      onDragEnter={this.onDragEnter}
      onDragLeave={this.onDragLeave}
      onDrop={this.dropListener}
      handleFileUpload={this.props.handleFileUpload}
      handleInputSelectedFile={this.props.handleInputSelectedFile}
      onFileChange={this.onFileChange}
    />
  )
}


}

export default DragAndDropFile;