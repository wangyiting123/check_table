import React, { useState, Component } from 'react';
import { Modal, Button } from 'antd';
import ReactDOM from 'react-dom';

interface props {
    content: any,
    title: string,
    show?: boolean,
    confirm: Function,
    cancel?: Function
}
class Dialog extends Component<props, any> {
  state = { visible: true };
  componentWillReceiveProps (nextProps: props) {
     if (nextProps.show) {
        this.handleShow();
     }
  }

  handleShow = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.props.confirm();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.cancel && this.props.cancel();
  };

  render() {
    return (
      <div id = 'dialog-class'>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         {this.props.content}
        </Modal>
      </div>
    );
  }
}

const showDialog = (dialogContent: props) => {
    dialogContent.show = true;
    ReactDOM.render(
        <Dialog {...dialogContent} />,
        document.getElementById('app-dialog')
    );
}

export default showDialog;
