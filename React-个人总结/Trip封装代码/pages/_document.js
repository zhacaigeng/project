import Document, { Head, Main, NextScript } from '@ctrip/nfes-next/document'
import * as React from 'react'

export default class MyDocument extends Document {

  render() {
    /**
    * Here we use _document.js to add a "lang" propery to the HTML object if
    * one is set on the page.
    **/
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta content="telephone=no" name="format-detection" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta charSet="utf-8" />
          <link rel="icon" type="image/png" sizes="16x16" href="//pages.trip.com/Moxcard/triplink/favicon16_16.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="//pages.trip.com/Moxcard/triplink/favicon32_32.png" />
          <style dangerouslySetInnerHTML={{
            __html: `
             #__next {
              height: 100%;
            }` }} />
        </Head>
        <body className='search-body'>
          <Main />
          <NextScript />
          <input type="hidden" id="page_id" value="wait"/>
        </body>
      </html>
    )
  }
}
