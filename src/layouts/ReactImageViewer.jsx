import React from "react";
import ImgsViewer from "react-images-viewer";

const ReactImageViewer = props => {
  return (
    <>
      <ImgsViewer
        imgs={[{ src: props.imgs }]}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
    </>
  );
};

export default ReactImageViewer;
