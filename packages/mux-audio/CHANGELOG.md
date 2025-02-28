# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.6.0 (2022-07-05)

### Bug Fixes

- Add catches with error logging if mux-video or mux-audio fails to load or parse metadata from metadata-url. ([c53a9be](https://github.com/muxinc/elements/commit/c53a9be15b7a8ec8e7191ce1136152bf3d046a63))
- clear some state on playbackId change ([#174](https://github.com/muxinc/elements/issues/174)) ([af0738e](https://github.com/muxinc/elements/commit/af0738ea5ae5a75861f75fc2ae3809ada735f3e2))
- custom video events handling ([#203](https://github.com/muxinc/elements/issues/203)) ([a909f89](https://github.com/muxinc/elements/commit/a909f89a69ee0d4b67e9d9371ac0f80984016181))
- error message was not passed back to player ([ade8143](https://github.com/muxinc/elements/commit/ade81438834610a7bddfa158ff20ec671ccd508f))
- fix 3x init of playback-core if `src` used ([#213](https://github.com/muxinc/elements/issues/213)) ([1d3e465](https://github.com/muxinc/elements/commit/1d3e465f8cc40544f0fb2c17ff4fb435c9e9a807))
- keep .hls but have it log a warning saying to use .\_hls ([11e6c10](https://github.com/muxinc/elements/commit/11e6c102a7e238bc8104c52ae9b94e7e3c2c7e19))
- **mux-audio:** Fix mux-audio, add shadow & props ([c74a448](https://github.com/muxinc/elements/commit/c74a448347cf6585944a08c977b138c560229e4e))
- **mux-audio:** use generateInitTime() instead of Date.now. ([6b67651](https://github.com/muxinc/elements/commit/6b67651245ee32ee864c8c114cdf480c618e2d8a))
- **mux-audio:** Use window polyfill for CustomAudioElement browser dependencies. ([2afb742](https://github.com/muxinc/elements/commit/2afb742911a29e708283faaca5fc966b9493670a))
- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))
- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
- add part=video/audio for mux-video/audio ([49e5b6f](https://github.com/muxinc/elements/commit/49e5b6f14fde14d429afae5c5a46d7595c4e027e)), closes [#125](https://github.com/muxinc/elements/issues/125)
- Extended autoplay options ([#116](https://github.com/muxinc/elements/issues/116)) ([475e838](https://github.com/muxinc/elements/commit/475e83884f641c578fa601c9501147d485fc1831))
- Initial immplementation of mux-audio. ([a33b2ea](https://github.com/muxinc/elements/commit/a33b2ea1ba5b0a3c2c684291f98b3071bc4267ba))
- rename hls to \_hls ([2d53bc2](https://github.com/muxinc/elements/commit/2d53bc2517840d65a8fd5e2bb2d979ce8b491116))
- support hls audio as first pass impl. Re-add playback-id support. ([d5229d2](https://github.com/muxinc/elements/commit/d5229d26be74338158a4037ff82f23123011cc6c))
- **support-media-types:** Add support for non hls media. Add (optional) type attribute. (refs [#23](https://github.com/muxinc/elements/issues/23)) ([fe4cdd5](https://github.com/muxinc/elements/commit/fe4cdd59f63188033d737c9166ef0522b6ef74d6))
- **support-media-types:** ignore case for shorthand types. (fixes [#23](https://github.com/muxinc/elements/issues/23)) ([64eb088](https://github.com/muxinc/elements/commit/64eb0888d3d41880ff26b471db0cb964b61350ad))
- Updates to make mux-audio and mux-video builds easy to use in next.js (fixes [#15](https://github.com/muxinc/elements/issues/15)) ([99b8ea7](https://github.com/muxinc/elements/commit/99b8ea74785903c5b300007cf8c3bc8a7601ae2d))

## [0.5.6](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.5.5...@mux-elements/mux-audio@0.5.6) (2022-06-23)

**Note:** Version bump only for package @mux-elements/mux-audio

## [0.5.5](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.5.4...@mux-elements/mux-audio@0.5.5) (2022-06-06)

**Note:** Version bump only for package @mux-elements/mux-audio

## [0.5.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.5.3...@mux-elements/mux-audio@0.5.4) (2022-05-26)

**Note:** Version bump only for package @mux-elements/mux-audio

## [0.5.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.5.2...@mux-elements/mux-audio@0.5.3) (2022-05-23)

**Note:** Version bump only for package @mux-elements/mux-audio

## [0.5.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.5.1...@mux-elements/mux-audio@0.5.2) (2022-05-20)

### Bug Fixes

- switch cjs extension to .cjs.js ([30e83c3](https://github.com/muxinc/elements/commit/30e83c3ce0bd9bfda4817c30ffe0921e425619e4))

## [0.5.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.5.0...@mux-elements/mux-audio@0.5.1) (2022-05-10)

### Bug Fixes

- error message was not passed back to player ([ade8143](https://github.com/muxinc/elements/commit/ade81438834610a7bddfa158ff20ec671ccd508f))
- fix 3x init of playback-core if `src` used ([#213](https://github.com/muxinc/elements/issues/213)) ([1d3e465](https://github.com/muxinc/elements/commit/1d3e465f8cc40544f0fb2c17ff4fb435c9e9a807))

# [0.5.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.4.4...@mux-elements/mux-audio@0.5.0) (2022-05-03)

### Bug Fixes

- custom video events handling ([#203](https://github.com/muxinc/elements/issues/203)) ([a909f89](https://github.com/muxinc/elements/commit/a909f89a69ee0d4b67e9d9371ac0f80984016181))
- keep .hls but have it log a warning saying to use .\_hls ([11e6c10](https://github.com/muxinc/elements/commit/11e6c102a7e238bc8104c52ae9b94e7e3c2c7e19))

### Features

- add part=video/audio for mux-video/audio ([49e5b6f](https://github.com/muxinc/elements/commit/49e5b6f14fde14d429afae5c5a46d7595c4e027e)), closes [#125](https://github.com/muxinc/elements/issues/125)
- rename hls to \_hls ([2d53bc2](https://github.com/muxinc/elements/commit/2d53bc2517840d65a8fd5e2bb2d979ce8b491116))

## [0.4.4](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.4.3...@mux-elements/mux-audio@0.4.4) (2022-04-22)

### Bug Fixes

- point pkgjson#browser at mjs build for webpack 4 ([#191](https://github.com/muxinc/elements/issues/191)) ([a73a495](https://github.com/muxinc/elements/commit/a73a4951052bfc77cc24667b9bc0a05efbcbb355))

## [0.4.3](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.4.2...@mux-elements/mux-audio@0.4.3) (2022-04-18)

**Note:** Version bump only for package @mux-elements/mux-audio

## [0.4.2](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.4.1...@mux-elements/mux-audio@0.4.2) (2022-04-12)

### Bug Fixes

- clear some state on playbackId change ([#174](https://github.com/muxinc/elements/issues/174)) ([af0738e](https://github.com/muxinc/elements/commit/af0738ea5ae5a75861f75fc2ae3809ada735f3e2))

## [0.4.1](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.4.0...@mux-elements/mux-audio@0.4.1) (2022-04-01)

**Note:** Version bump only for package @mux-elements/mux-audio

# [0.4.0](https://github.com/muxinc/elements/compare/@mux-elements/mux-audio@0.3.0...@mux-elements/mux-audio@0.4.0) (2022-03-28)

### Bug Fixes

- **mux-audio:** Fix mux-audio, add shadow & props ([c74a448](https://github.com/muxinc/elements/commit/c74a448347cf6585944a08c977b138c560229e4e))
- **mux-audio:** use generateInitTime() instead of Date.now. ([6b67651](https://github.com/muxinc/elements/commit/6b67651245ee32ee864c8c114cdf480c618e2d8a))
- **mux-audio:** Use window polyfill for CustomAudioElement browser dependencies. ([2afb742](https://github.com/muxinc/elements/commit/2afb742911a29e708283faaca5fc966b9493670a))
- prettier format all elements files ([741d607](https://github.com/muxinc/elements/commit/741d607521ca9578cfad9f0a9216a6565b4c56a1))

### Features

- add beaconCollectionDomain option to replace beaconDomain ([a44b699](https://github.com/muxinc/elements/commit/a44b699ae3138590b9d953f693f95971694658df))
