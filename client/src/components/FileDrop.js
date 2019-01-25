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
import { Button, Form, Popup } from 'semantic-ui-react';
import { Component } from 'react';

class DragAndDropFile extends Component{
  constructor() {
    super();
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
  
onFileChanged = ev => {
  if (ev.target.files && ev.target.files[0]) {
    this.setState({file:ev.target.files[0]});
  }
};

componentDidMount() {
  
}




}
