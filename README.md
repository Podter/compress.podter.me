# compress.podter.me

The simplest video compressor on the internet. Built with React, FFmpeg and WebAssembly.
Installable as a PWA on any device and works offline.

https://compress.podter.me

## Features

- Compress videos with a simple drag and drop
- Installable as PWA on any device
- No ads and watermarks
- No server-side processing
- Works offline

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Deployment

This is a single-page application, so you can deploy it on any static hosting service.

But you need to set the following headers in your server configuration:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

This is required for [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) to work with [ffmpeg.wasm](https://ffmpegwasm-0-11-x.netlify.app).
You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements).

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
