if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const u=e=>i(e,t),o={module:{uri:t},exports:c,require:u};s[t]=Promise.all(a.map((e=>o[e]||u(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1545be0e8a1300582674e4e7cd071cd8"},{url:"/_next/static/G1WQx_RWKuR55ioy7Ouu7/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/G1WQx_RWKuR55ioy7Ouu7/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/13b76428-9256091adcccefa4.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/23-8e9289df15cc570a.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/231-178d57e713070ceb.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/343-62556fd7b23e9eae.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/35.03ae917f238a8966.js",revision:"03ae917f238a8966"},{url:"/_next/static/chunks/442-95209186e9aff13b.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/491-e4289814d1ac8679.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/640-9e6711f51de55252.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/795d4814-facad097988a9582.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/8e1d74a4-d71c2462f5ab9cbd.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/9c4e2130-b459a33ca75a4154.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/_not-found/page-a3658b6ff8a829b2.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/layout-808e42bcf37e1744.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/orders/%5Bid%5D/page-013efafea2d9a3b8.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/orders/new-order/page-b4c8137cc881363b.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/orders/page-bbbd066a6f9f4be6.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/page-aa9483539ea114e3.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/products/%5Bid%5D/page-7c4dff312fa1e830.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/products/add-product/page-edb561e8ec7e9eaf.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/products/page-a00be843ee904acf.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/app/reports/page-c477c936660ec8b1.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/c916193b-e3951ef92f80f4f2.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/ca377847-526f8ff3c72a5773.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/e8686b1f-763c7795aa76c72c.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/fd9d1056-868e7f2731bf83b2.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/main-54f47004acb1ec87.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/main-app-1741c7160f83cf03.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1a93d6446baf9fc0.js",revision:"G1WQx_RWKuR55ioy7Ouu7"},{url:"/_next/static/css/70c698e88f976a9d.css",revision:"70c698e88f976a9d"},{url:"/_next/static/css/dcfd3f70b7b456ce.css",revision:"dcfd3f70b7b456ce"},{url:"/_next/static/css/e6923c42fa7554e3.css",revision:"e6923c42fa7554e3"},{url:"/_next/static/css/f5d4880048c829e3.css",revision:"f5d4880048c829e3"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/chicken.jpg",revision:"7505fba12c919439e5a2a54142877c76"},{url:"/chicken2.png",revision:"59e534352a9c8bfd91b2c2b0641da179"},{url:"/home.png",revision:"822ce8f26f0f916b26f915b0cb2947f1"},{url:"/manifest.json",revision:"9c05600a5bb2c4ee8dd93774083f1f55"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
