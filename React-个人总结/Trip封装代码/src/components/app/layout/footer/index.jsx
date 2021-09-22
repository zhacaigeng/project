import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
import './index.scss';

export default class FooterComponents extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>TripLink Design ©2020 Created by TripLink</Footer>
    )
  }
}