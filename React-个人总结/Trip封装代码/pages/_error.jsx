import React from 'react';
import { Page, Link } from '@ctrip/nfes'
import { Button } from 'antd';

export default class NoFoundPage extends Page {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          padding: 80,
          textAlign: 'center',
        }}>
        <img src="https://gw.alipayobjects.com/zos/antfincdn/wsE2Pw%243%26L/noFound.svg" alt="404" />
        <br />
        <br />
        <h1>404</h1>
        <p>The page you visit does not exist</p>
        <Button type="primary" onClick={() => this.redirect('/')}>
          Back to Home Page
        </Button>
      </div>
    )
  }
}