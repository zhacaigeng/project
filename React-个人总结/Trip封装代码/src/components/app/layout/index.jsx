import React, { Component } from 'react';
import { Layout } from 'antd';
import Left from './left';
import Footer from './footer';
import Header from './header';

const { Content } = Layout;

export function TriplinkLayout({ children }) {
    
    return (
        <Layout style={{height: '100%'}}>   
            <Left />      
            <Layout>
                <Header />
                <Content
                    style={{
                        background: '#fff',
                        minHeight: 'auto',
                        padding: '0 20px'
                    }}>
                    <div className="m-layout-content">
                        {children}
                    </div>
                </Content>                    
                <Footer />
            </Layout>
        </Layout>
    )
}
