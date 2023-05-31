// Environment: server

import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { PageContext } from "@yext/pages";
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import {cache} from '@emotion/css';
import Favicon from "../assets/images/yext-favicon.ico";

export { render };

const render = async (pageContext: PageContext<any>) => {
  const { Page, pageProps } = pageContext;
  
  const viewHtml = ReactDOMServer.renderToString(
    // Use cache from @emotion/css instead of creating our own using createCache from @emotion/cache
    // https://github.com/emotion-js/emotion/issues/2731
    <CacheProvider value={cache}>
      <Page {...pageProps} />
    </CacheProvider>
  );
  
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const chunks = extractCriticalToChunks(viewHtml);
  const styles = constructStyleTagsFromChunks(chunks);

  const title = pageProps.document.name;
  const language = pageProps.document.locale;

  return `<!DOCTYPE html>
    <html lang="${language}">
      <head>
        <title>${title}</title>
        <link rel="icon" type="image/x-icon" href=${Favicon}>
        ${styles}
      </head>
      <body>
        <div>Duval is the GOAT!!!</div>
        <div id="test">${viewHtml}</div>
      </body>
    </html>`;
};