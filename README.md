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


## Expected
 
[index.html](./index.html#L7) says:

```html
<script type="application/javascript" src="/path/bundle.bundle.js"></script>
```

