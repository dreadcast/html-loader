# html-loader bug

## What happens

html-loader should process HTML code then use appropriate loaders when encountering _URL_.
Image's `src` or link's `rel` attributes are correctly processed and matching loaders will output chunks as expected.

* This is not the case with script's `src` attributes.
* Moreover, Webpack will neither ouput chunks when passing an URL ending with `.js` enxtension to an image's `src` attribute.
* Adding `require('bundle.bundle.js')` to [entry point](./index.js) will ouput chunk as expected.

### Loader config

[Webpack config](./webpack.dev.config.js#L87) says:

```javascript
{
	test: /\.html$/,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[name].html',
			},
		},
		{ loader: 'extract-loader' },
		{
			loader: 'html-loader',
			options: {
				attrs: [':src', 'link:href'],
			},
		},
	]
}
```

## What happens
 
[index.html](./index.html#L7) says:

```html
<script type="application/javascript" src="[object Object]"></script>
```

### Webpack output

```
> html-loader@0.0.1 start /Users/dreadcast/Sites/html-loader
> webpack-dev-server --progress --config ./webpack.dev.config

 10% building 1/1 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:8078/
ℹ ｢wds｣: webpack output is served from /path/
ℹ ｢wds｣: Content not from webpack is served from ./build
ℹ ｢wdm｣: Hash: ca4b18b2e22c3a0bc984
Version: webpack 4.28.2
Time: 656ms
Built at: 08/02/2019 14:37:29
     Asset       Size  Chunks             Chunk Names
   img.png    1.9 KiB          [emitted]
index.html  362 bytes          [emitted]
  index.js    342 KiB   index  [emitted]  index
  **********************************************    {   MISSING bundle.bundle.js HERE   }
window.css  125 bytes          [emitted]
Entrypoint index = index.js
[0] multi (webpack)-dev-server/client?http://localhost:8078 index.js 40 bytes {index} [built]
[./index.html] 56 bytes {index} [built]
[./index.js] 24 bytes {index} [built]
[./node_modules/ansi-html/index.js] 4.16 KiB {index} [built]
[./node_modules/ansi-regex/index.js] 135 bytes {index} [built]
[./node_modules/events/events.js] 13.3 KiB {index} [built]
[./node_modules/html-entities/index.js] 231 bytes {index} [built]
[./node_modules/loglevel/lib/loglevel.js] 7.68 KiB {index} [built]
[./node_modules/strip-ansi/index.js] 161 bytes {index} [built]
[./node_modules/url/url.js] 22.8 KiB {index} [built]
[./node_modules/webpack-dev-server/client/index.js?http://localhost:8078] (webpack)-dev-server/client?http://localhost:8078 7.78 KiB {index} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.58 KiB {index} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.05 KiB {index} [built]
[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {index} [built]
[./node_modules/webpack/hot/emitter.js] (webpack)/hot/emitter.js 75 bytes {index} [built]
    + 14 hidden modules
ℹ ｢wdm｣: Compiled successfully.
```


## Expected
 
[index.html](./index.html#L7) says:

```html
<script type="application/javascript" src="/path/bundle.bundle.js"></script>
```

