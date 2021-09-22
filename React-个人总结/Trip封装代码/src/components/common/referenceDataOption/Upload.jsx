import React from 'react';
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, message, Modal, Divider, Steps, Tabs, Tag, Pagination, InputNumber, Upload } from 'antd';
import urlConfig from '$config/url';
let _file = ''
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  

export default class UploadComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_a: [],
            modal1Visible: false,
            modalEditVisible: false,
            totalCount: 0,
            merchantInfo: {},
            customerId: '',
            customerList: [],
            currencyList: [],
            provisionName: '',
        };

    }
    // 校验图片
    beforeUpload=(file)=> {
        const isJpgOrPng =  ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type);
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/JPEG/PNG/PDF file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        // if (!isLt2M) {
        //   message.error('Image must smaller than 5MB!');
        // }
        return isJpgOrPng && isLt2M;
      }
    // 上传组件
    uploadHandleChange = info => {
        if (info.file.status === 'uploading') {
          return this.setState({ loading: true });
        } else if (info.file.status === 'error') {
          return message.error(`${info.file.name} file upload failed.`);
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
          info.file.response.code == '000000' && message.success(info.file.response.message||'success')
        // 返回父组件
        this.props.callback && this.props.callback(info.file.response)
        }
      };
    // 渲染
    render() {
        const {url='', type='', data, ButtonTxt} = this.props;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">{ButtonTxt || 'Upload'}</div>
            </div>
          );
          const { imageUrl } = this.state;
          return (
            type == 'upload'?
            <Upload
              data={data||{}}
              name='file'
              action= {`${urlConfig.cppapi}${url}`}
              headers={{authorization: 'authorization-text'}}
              onChange={this.uploadHandleChange}
              showUploadList={false}
            >
              <Button><Icon type="upload" />{ButtonTxt||'上传'}</Button>
            </Upload>:
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${urlConfig.cppapi}/deposit/fileUpload`}
              beforeUpload={this.beforeUpload}
              onChange={this.uploadHandleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          );
    }
}