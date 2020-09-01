import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

function MyDropzone({ setFiles }) {
  const dropZoneStyle = {
    border: "dashed 3px #eee",
    borderRadius: "5%",
    padding: 30,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  };
  const dropZoneActive = {
    border: "dashed 4px green",
  };
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file =>Object.assign(file, {
        preview: URL.createObjectURL(file)
    })))
  }, [setFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
    {...getRootProps()}
    style={isDragActive ? { ...dropZoneStyle, ...dropZoneActive } : dropZoneStyle}>
        <input {...getInputProps()} />
        <Icon name="upload" size="huge" />
        <Header sub content="Drop Image Here" />
    </div>
);
}
export default MyDropzone;
