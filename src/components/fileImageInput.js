import React from "react";

class FileImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange },
    } = this.props;

    onChange(e.target.files[0]);
  }

  render() {
    const { input } = this.props;
    delete input.value;
    return (
      <input
        type="file"
        onChange={this.onChange}
        accept="image/x-png,image/gif,image/jpeg"
        style={{ display: "none" }}
      />
    );
  }
}

export default FileImageInput;
