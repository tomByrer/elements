# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.1.0-beta.3](https://github.com/muxinc/elements/compare/@mux/mux-uploader@0.1.0-beta.2...@mux/mux-uploader@0.1.0-beta.3) (2022-07-11)

### Bug Fixes

- **mux-uploader:** Fix default format progress to include percent symbol. Move to module fn. ([6f519f7](https://github.com/muxinc/elements/commit/6f519f7335c62b031781d9d68de4aadab39b2089))
- **mux-uploader:** Fix syntax in README for components. ([affb4ca](https://github.com/muxinc/elements/commit/affb4ca365f7a9410d03b9d4bfe69eac3d40dca3))
- **mux-uploader:** handle slotted/changing buttons. rename slot per informal conventions on other projects ([1829fd9](https://github.com/muxinc/elements/commit/1829fd9817976750797cae4de0054d0e165bb269))
- **mux-uploader:** Polyfill for SSR. ([f559f68](https://github.com/muxinc/elements/commit/f559f68b3f3746d74155a3db919521aa864a7321))
- **mux-uploader:** re-add drop import to ensure custom element registration. Start work on overlay css. ([1ae4a2e](https://github.com/muxinc/elements/commit/1ae4a2e3e83467fa97fe86aadfe9fbeed09981c5))
- **mux-uploader:** Refactor overlay behavior for drop. Remove z-index assumptions from uploader. Rename overlay text attr to overlay-text for clarity. ([dcf2c80](https://github.com/muxinc/elements/commit/dcf2c8052581e8174bed59a01a1ca30a7780fa93))
- **mux-uploader:** Refactor so that drop can only be done with mux-uploader-drop. ([59ddb56](https://github.com/muxinc/elements/commit/59ddb56f22a59b8ba8d4f83cab5653097781bd16))
- **mux-uploader:** Simplify drop internal DOM structure to have more predictable layout & styling. ([ec108ba](https://github.com/muxinc/elements/commit/ec108bae3c047b35c7316b350ee69d8dc2beffd7))

### Features

- Add formatProgress method for customization. Bugfix for default uploader button. ([e7860e9](https://github.com/muxinc/elements/commit/e7860e910df648355f1a18c51d248e088f7d3221))
- **mux-uploader:** Add events that correspond to upchunk events. Early bail when no URL is provided. ([740aa96](https://github.com/muxinc/elements/commit/740aa96455c910f16c88b440dc78f8321a3c3d44))
- **mux-uploader:** move some dom elements around to make eventual overlay (re)styling a bit easier. ([919072a](https://github.com/muxinc/elements/commit/919072a8ba0788c4f154684415db21ec37d2e5df))
- **mux-uploader:** Simplify mux-uploader-drop styling. Update vanilla uploader example to demo usage with simplified styling. ([8029a1d](https://github.com/muxinc/elements/commit/8029a1d48cf9a1651b26d7a4740abb4d0ef182a4))

# 0.1.0-beta.2 (2022-07-05)

### Bug Fixes

- **mux-uploader:** Make progress, errors, completion accessible to VoiceOver. ([59e115c](https://github.com/muxinc/elements/commit/59e115c8bd5fd79d920343b238817bfbbdfd2c55))

### Features

- **mux-uploader:** Initial implementation of the mux-uploader element. ([b30717d](https://github.com/muxinc/elements/commit/b30717d41c0b2cc9c564bec681bd7ca109b1ce27))

# 0.1.0-beta.1 (2022-06-23)

### Features

- **mux-uploader:** Initial implementation of the mux-uploader element. ([b30717d](https://github.com/muxinc/elements/commit/b30717d41c0b2cc9c564bec681bd7ca109b1ce27))
