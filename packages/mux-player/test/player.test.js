import { fixture, assert, aTimeout, waitUntil } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-player>', () => {
  it('has a Mux specific API', async function () {
    this.timeout(5000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      env-key="ilc02s65tkrc2mk69b7q2qdkf"
      start-time="0"
      stream-type="on-demand"
      prefer-mse
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', 'playback-id is reflected');
    assert.equal(player.envKey, 'ilc02s65tkrc2mk69b7q2qdkf', 'env-key is reflected');
    assert.equal(player.startTime, 0, 'startTime is set to 0');
    assert.equal(player.streamType, 'on-demand', 'stream-type is on-demand');
    assert.equal(player.preferMse, true, 'prefer-mse is on');
    assert.equal(player.debug, false, 'debug is off');
  });

  it('has a video like API', async function () {
    this.timeout(10000);

    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    assert(player.paused, 'is paused on initialization');
    assert(!player.ended, 'is not ended');

    assert(!player.loop, 'loop is false by default');
    player.loop = true;
    assert(player.loop, 'loop is true');

    assert.equal(player.volume, 1, 'is all turned up');
    player.volume = 0.5;
    assert.equal(player.volume, 0.5, 'is half volume');

    player.muted = true;
    assert(player.muted, 'is muted');

    try {
      await player.play();
    } catch (error) {
      console.warn(error);
    }

    assert(!player.paused, 'is playing after player.play()');
    assert.equal(Math.round(player.duration), 134, `is 134s long`);

    await aTimeout(1000);

    assert.equal(String(Math.round(player.currentTime)), 1, 'is about 1s in');

    player.playbackRate = 2;
    await aTimeout(1000);

    assert.equal(String(Math.round(player.currentTime)), 3, 'is about 3s in');
  });

  it('playbackId is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');
  });

  it('autoplay is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      autoplay
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.autoplay, true);
    assert.equal(muxVideo.autoplay, true);

    player.removeAttribute('autoplay');
    assert(!muxVideo.hasAttribute('autoplay'), `has autoplay attr removed`);

    player.setAttribute('autoplay', '');
    assert.equal(muxVideo.getAttribute('autoplay'), '', `has autoplay attr added`);
    assert.equal(muxVideo.autoplay, true, `has autoplay enabled`);
  });

  it('muted is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      muted
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.muted, true);
    assert.equal(muxVideo.muted, true);

    player.removeAttribute('muted');
    assert(!muxVideo.hasAttribute('muted'), `has muted attr removed`);

    player.setAttribute('muted', '');
    assert.equal(muxVideo.getAttribute('muted'), '', `has muted attr added`);
    assert.equal(muxVideo.muted, true, `has muted enabled`);
  });

  // it("playsinline is forwarded to the media element", async function () {
  //   const player = await fixture(`<mux-player
  //     playsinline
  //   ></mux-player>`);
  //   const muxVideo = player.media;

  //   assert.equal(player.playsInline, true);
  //   assert.equal(muxVideo.playsInline, true);

  //   player.removeAttribute("playsinline");
  //   assert(
  //     !muxVideo.hasAttribute("playsinline"),
  //     `has playsinline attr removed`
  //   );

  //   player.setAttribute("playsinline", "");
  //   assert.equal(
  //     muxVideo.getAttribute("playsinline"),
  //     "",
  //     `has playsinline attr added`
  //   );
  //   assert.equal(muxVideo.playsInline, true, `has playsInline enabled`);
  // });

  it('loop is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      loop
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.loop, true);
    assert.equal(muxVideo.loop, true);

    player.removeAttribute('loop');
    assert(!muxVideo.hasAttribute('loop'), `has loop attr removed`);

    player.setAttribute('loop', '');
    assert.equal(muxVideo.getAttribute('loop'), '', `has loop attr added`);
    assert.equal(muxVideo.loop, true, `has loop enabled`);
  });

  // it("crossorigin is forwarded to the media element", async function () {
  //   const player = await fixture(`<mux-player
  //     crossorigin="anonymous"
  //   ></mux-player>`);
  //   const muxVideo = player.media;

  //   assert.equal(player.crossOrigin, "anonymous");
  //   assert.equal(muxVideo.crossOrigin, "anonymous");

  //   player.removeAttribute("crossorigin");
  //   assert(
  //     !muxVideo.hasAttribute("crossorigin"),
  //     `has crossorigin attr removed`
  //   );

  //   player.setAttribute("crossorigin", "use-credentials");
  //   assert.equal(
  //     muxVideo.getAttribute("crossorigin"),
  //     "use-credentials",
  //     `has crossorigin attr added`
  //   );
  //   assert.equal(
  //     muxVideo.crossOrigin,
  //     "use-credentials",
  //     `has crossorigin enabled`
  //   );
  // });

  it('preload is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      preload="metadata"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.preload, 'metadata');
    assert.equal(muxVideo.preload, 'metadata');

    player.removeAttribute('preload');
    assert(!muxVideo.hasAttribute('preload'), `has preload attr removed`);

    player.setAttribute('preload', 'auto');
    assert.equal(muxVideo.getAttribute('preload'), 'auto', `has preload attr added`);
    assert.equal(muxVideo.preload, 'auto', `has preload enabled`);
  });

  it('poster is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      poster="https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(
      player.poster,
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0'
    );
    assert.equal(
      muxVideo.poster,
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=0'
    );

    player.removeAttribute('poster');
    assert(!muxVideo.hasAttribute('poster'), `has poster attr removed`);

    player.setAttribute(
      'poster',
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1'
    );
    assert.equal(
      muxVideo.getAttribute('poster'),
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1',
      `has poster attr added`
    );
    assert.equal(
      muxVideo.poster,
      'https://image.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE/thumbnail.jpg?time=1',
      `has poster enabled`
    );
  });

  it('src is forwarded to the media element', async function () {
    const player = await fixture(`<mux-player
      src="https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8"
    ></mux-player>`);
    const muxVideo = player.media;

    assert.equal(player.src, 'https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8');
    assert.equal(muxVideo.src, 'https://stream.mux.com/r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA.m3u8');

    player.removeAttribute('src');
    assert(!muxVideo.hasAttribute('src'), `has src attr removed`);

    player.setAttribute('src', 'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8');
    assert.equal(
      muxVideo.getAttribute('src'),
      'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8',
      `has src attr added`
    );
    assert.equal(
      muxVideo.src,
      'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8',
      `has src enabled`
    );
  });

  it('should forward metadata attributes to the media element', async () => {
    const video_id = 'test-video-id';
    const video_title = 'test-video-title';
    const viewer_user_id = 'test-viewer-user-id';
    const player = await fixture(`<mux-player
      metadata-video-id="${video_id}"
      metadata-video-title="${video_title}"
      metadata-viewer-user-id="${viewer_user_id}"
    ></mux-player>`);

    const actual = player.media.metadata;
    const expected = { video_id, video_title, viewer_user_id };
    assert.include(actual, expected, 'has expected metadata entries from attrs');
  });

  it('muted attribute behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert(player.muted, 'player.muted is true');
    assert(muxVideo.muted, 'muxVideo.muted is true');
    assert(nativeVideo.muted, 'nativeVideo.muted is true');

    player.removeAttribute('muted');

    assert(!player.muted, 'player.muted is false');
    assert(!muxVideo.muted, 'muxVideo.muted is false');
    assert(!nativeVideo.muted, 'nativeVideo.muted is false');

    player.setAttribute('muted', '');

    assert(player.muted, 'player.muted is true');
    assert(muxVideo.muted, 'muxVideo.muted is true');
    assert(nativeVideo.muted, 'nativeVideo.muted is true');
  });

  it('volume attribute behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      volume="0.4"
    ></mux-player>`);

    assert.equal(player.getAttribute('volume'), '0.4');

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert.equal(player.volume, 0.4, 'player.volume is 0.4');
    assert.equal(muxVideo.volume, 0.4, 'muxVideo.volume is 0.4');
    assert.equal(nativeVideo.volume, 0.4, 'nativeVideo.volume is 0.4');

    player.setAttribute('volume', '0.9');

    assert.equal(player.volume, 0.9, 'player.volume is 0.9');
    assert.equal(muxVideo.volume, 0.9, 'muxVideo.volume is 0.9');
    assert.equal(nativeVideo.volume, 0.9, 'nativeVideo.volume is 0.9');
  });

  it('playbackrate attribute behaves like expected', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      playbackrate="2"
    ></mux-player>`);

    assert.equal(player.getAttribute('playbackrate'), '2');

    const muxVideo = player.media;
    const nativeVideo = muxVideo.shadowRoot.querySelector('video');

    assert.equal(player.playbackRate, 2, 'player.playbackRate is 2');
    assert.equal(muxVideo.playbackRate, 2, 'muxVideo.playbackRate is 2');
    assert.equal(nativeVideo.playbackRate, 2, 'nativeVideo.playbackRate is 2');

    player.setAttribute('playbackrate', '0.7');

    assert.equal(player.playbackRate, 0.7, 'player.playbackRate is 0.7');
    assert.equal(muxVideo.playbackRate, 0.7, 'muxVideo.playbackRate is 0.7');
    assert.equal(nativeVideo.playbackRate, 0.7, 'nativeVideo.playbackRate is 0.7');
  });

  it("signing tokens generate correct asset URL's", async function () {
    // tokens expire in 10 years
    const player = await fixture(`<mux-player
      stream-type="on-demand"
      playback-id="bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY"
      playback-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA"
      thumbnail-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w"
      storyboard-token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw"
    ></mux-player>`);

    const muxVideo = player.media;
    const storyboardTrack = muxVideo.shadowRoot.querySelector("track[label='thumbnails']");

    assert.equal(
      muxVideo.getAttribute('src'),
      'https://stream.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY.m3u8?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE2MjgsImF1ZCI6InYiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.OUegJAmrlvD9BhzUhogrup_mYRBYNG2ocqmJZK2lKPLFmP1jLKi99Lj_9ZQqIXgmoYeXo2jKr3WFMO8nbGwtZFKU2_szq1EWlj4mBgdWXfAP5amC92qkm87nIuNFM2WVANGlBksmj8uOmYNIuPh1Ctti1qiJEYkf-JthWFFpaR_2TlQJ7g0bmRPzk3nOPDtqZnJBfTVm3n4Kp7Cr27a_VBA6zpoW6DwjJ6_uPkm6TAxXjw7VWNd3YVLs7S_jgs8q3t9DPpAN57q94syVQtEUkRh4tlDX-gdIrJDi9nFB1fIBh45pD01PvrAWzZXKKE9YSW7dnktqSUy81kcu2F_gXA'
    );

    assert.equal(
      muxVideo.getAttribute('poster'),
      'https://image.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY/thumbnail.jpg?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3MzYsImF1ZCI6InQiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.gDe_efqmRB5E3e4ag6in8MfMK-Vn3c_3B4M-BiWw6lg2aaf2BOTv7ltxhn2cvg4G0iFi-esRjhDlHbMRTxwTGavsx8TRLFtJ8vyBzToaFQbQMrn9OZztq_XrCEwqkD8bUAVtdOT1YB606OZyy6XO-CxdMRrKMUsM-cGrfv0TxvzJjThJBY4SzFv_whtYRxqAypZojROU7IiTbqcsk_cSrRMjB7WyAOAvyPNKnr6RkVEuMJtlCtaf_e4DIJHebZUZb3JmVTG4jIWrD1QkN7uLUwCPPRvGhXwhet9JaJPyC5lmkcb9YmH-15V6GOpwSg7sDMGC3YS4aIb_RtVkan0t-w'
    );

    assert.equal(
      storyboardTrack.getAttribute('src'),
      'https://image.mux.com/bos2bPV3qbFgpVPaQ900Xd5UcdM6WXTmz02WZSz01nJ00tY/storyboard.vtt?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik96VU90ek1nUWhPbkk2MDJ6SlFQbU52THR4MDBnSjJqTlBxN0tTTzAxQlozelEifQ.eyJleHAiOjE5NjE2MDE3NzcsImF1ZCI6InMiLCJzdWIiOiJib3MyYlBWM3FiRmdwVlBhUTkwMFhkNVVjZE02V1hUbXowMldaU3owMW5KMDB0WSJ9.aVd0dsOJUVeQko3BWd9YEhL41Eytf_ZfaBeNzHSSUqU_gREa_jJEVTlRfuiE4g71cKJLSiVTKP7f-F7Txh6DlL8E2SkonfIPB2H0f_3DQxYLso2E8qI4zuJkyxKORbQFLAEB_vSE-2lMbrHXfdpQhv6SrVyu6di9ku0LpFpoyz-_7fVJICr8nhlsqOGt66AYcaa99TXoZ582FWzBaePmWw-WWKYsLvtNjLS9UoxbdVaBRwNylohvhh-i1Y9dNilyNooJ7O8Cj4GuMjeh1pCj0BOrGagxrWrswm3HjUVNUqFq5JCWnJCxgjjwiV4RLZg_4z7gkBXyX7H2-i1dKA3Cpw'
    );
  });
});

describe('<mux-player> playbackId transitions', () => {
  it('loads the new playbackId', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');

    player.playbackId = 'xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE';

    assert.equal(
      player.src,
      'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8?redundant_streams=true'
    );
  });

  it('loads the new playbackId and clears dialog state', async function () {
    const player = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.playbackId, 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe');

    player.dispatchEvent(
      new CustomEvent('error', {
        detail: { code: MediaError.MEDIA_ERR_NETWORK },
      })
    );

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3').textContent, 'Network Error');

    player.playbackId = 'xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE';

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3'), null);
  });

  it('loads the new src and clears dialog state', async function () {
    const player = await fixture(`<mux-player
      src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8"
      stream-type="on-demand"
      muted
    ></mux-player>`);

    assert.equal(player.src, 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8');

    player.dispatchEvent(
      new CustomEvent('error', {
        detail: { code: MediaError.MEDIA_ERR_NETWORK },
      })
    );

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3').textContent, 'Network Error');

    player.src = 'https://stream.mux.com/xLGf7y8cRquv7QXoDB02zEe6centwKfVmUOiPSY02JhCE.m3u8';

    assert.equal(player.shadowRoot.querySelector('mxp-dialog h3'), null);
  });
});

describe('seek to live behaviors', function () {
  this.timeout(12000);

  it('should not have a seek to live button if the stream-type is not live/ll-live', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
      stream-type="on-demand"
      preload="auto"
    ></mux-player>`);

    const mediaControllerEl = playerEl.mediaController;
    const seekToLiveEl = playerEl.shadowRoot.querySelector('slot[name="seek-to-live-button"]');
    assert.exists(mediaControllerEl);
    assert.notExists(seekToLiveEl);
  });

  it('should have a seek to live button if the stream-type is live', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      stream-type="live"
      preload="auto"
    ></mux-player>`);

    const mediaControllerEl = playerEl.mediaController;
    const seekToLiveEl = playerEl.theme.shadowRoot.querySelector('slot[name="seek-to-live-button"]');
    assert.exists(mediaControllerEl);
    assert.exists(seekToLiveEl);
  });

  it('should have a seek to live button if the stream-type is ll-live', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      stream-type="ll-live"
      preload="auto"
    ></mux-player>`);

    const mediaControllerEl = playerEl.mediaController;
    const seekToLiveEl = playerEl.theme.shadowRoot.querySelector('slot[name="seek-to-live-button"]');
    assert.exists(mediaControllerEl);
    assert.exists(seekToLiveEl);
  });

  it('should seek to live when seek to live button pressed', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      muted
      stream-type="ll-live"
      preload="auto"
    ></mux-player>`);

    const seekToLiveEl = playerEl.shadowRoot.querySelector('.mxp-seek-to-live-button');
    // NOTE: Need try catch due to bug in play+autoplay behavior (CJP)
    try {
      await playerEl.play();
    } catch (_e) {}
    await waitUntil(() => !playerEl.paused, 'play() failed');
    await waitUntil(() => playerEl.inLiveWindow, 'playback did not start inLiveWindow');
    playerEl.pause();
    await waitUntil(() => !playerEl.inLiveWindow, 'still inLiveWindow after long pause', { timeout: 7500 });
    seekToLiveEl.click();
    await waitUntil(() => playerEl.inLiveWindow, 'clicking seek to live did not seek to live window');
  });

  it('should seek to live when play button is pressed', async function () {
    const playerEl = await fixture(`<mux-player
      playback-id="v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM"
      muted
      stream-type="ll-live"
      preload="auto"
    ></mux-player>`);

    await playerEl.play();

    await waitUntil(() => !playerEl.paused, 'play() failed');
    await waitUntil(() => playerEl.inLiveWindow, 'playback did not start inLiveWindow');
    playerEl.pause();
    await waitUntil(() => !playerEl.inLiveWindow, 'still inLiveWindow after long pause', { timeout: 7500 });

    const mcPlayEl = playerEl.theme.shadowRoot.querySelector('media-play-button');
    mcPlayEl.click();
    await waitUntil(() => playerEl.inLiveWindow, 'clicking play did not seek to live window');
  });
});

describe('<mux-player> should move cues up', () => {
  it('when user the user active', async function () {
    let done;
    const promise = new Promise((resolve) => {
      done = resolve;
    });
    const player = await fixture(`<mux-player
      playback-id="qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    const mc = player.mediaController;
    const media = mc.media;

    media.textTracks.addEventListener('addtrack', (e) => {
      // wait till subtitles have loaded
      if (e.track.kind === 'subtitles') {
        // pool until cues have loaded
        const poolInterval = setInterval(() => {
          if (e.track.cues?.length) {
            clearInterval(poolInterval);
          } else {
            return;
          }

          const firstCue = e.track.cues[0];
          assert.equal(firstCue.line, 'auto', "the first cue's line is set to auto");

          e.track.addEventListener(
            'cuechange',
            () => {
              const activeCue = e.track.activeCues[0];
              assert.equal(activeCue.line, 'auto', "the active cue's line is set to auto");
              mc.addEventListener(
                'userinactivechange',
                () => {
                  assert.equal(activeCue.line, -4, 'the line is now set to -4');

                  mc.addEventListener(
                    'userinactivechange',
                    () => {
                      setTimeout(() => {
                        assert.equal(
                          activeCue.line,
                          'auto',
                          'the line prop was reset to original value after the 500ms wait'
                        );
                        done();
                      }, 500);
                    },
                    { once: true }
                  );
                  mc.setAttribute('user-inactive', '');
                  mc.dispatchEvent(new Event('userinactivechange'));
                },
                { once: true }
              );
              mc.removeAttribute('user-inactive');
              mc.dispatchEvent(new Event('userinactivechange'));
            },
            { once: true }
          );

          media.currentTime = firstCue.startTime + 0.1;
        }, 10);
      }
    });

    player.play().catch(() => {});
    return promise;
  });

  it('when the player is paused even if user is inactive', async function () {
    let done;
    const promise = new Promise((resolve) => {
      done = resolve;
    });
    const player = await fixture(`<mux-player
      playback-id="qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    const mc = player.mediaController;
    const media = mc.media;

    media.textTracks.addEventListener('addtrack', (e) => {
      // wait till subtitles have loaded
      if (e.track.kind === 'subtitles') {
        // pool until cues have loaded
        const poolInterval = setInterval(() => {
          if (e.track.cues?.length) {
            clearInterval(poolInterval);
          } else {
            return;
          }

          const firstCue = e.track.cues[0];
          assert.equal(firstCue.line, 'auto', "the first cue's line is set to auto");

          assert.isTrue(player.paused, 'player is paused');

          e.track.addEventListener(
            'cuechange',
            () => {
              const activeCue = e.track.activeCues[0];
              assert.equal(activeCue.line, -4, "the active cue's line is set to -4");
              done();
            },
            { once: true }
          );

          media.currentTime = firstCue.startTime + 0.1;
        }, 10);
      }
    });

    return promise;
  });

  it('unless the cues should be ignored', async function () {
    let done;
    const promise = new Promise((resolve) => {
      done = resolve;
    });
    const player = await fixture(`<mux-player
      playback-id="qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM"
      stream-type="on-demand"
      muted
      preload="auto"
    ></mux-player>`);

    const mc = player.mediaController;
    const media = mc.media;

    media.textTracks.addEventListener('addtrack', (e) => {
      // wait till subtitles have loaded
      if (e.track.kind === 'subtitles') {
        // pool until cues have loaded
        const poolInterval = setInterval(() => {
          if (e.track.cues?.length) {
            clearInterval(poolInterval);
          } else {
            return;
          }

          const firstCue = e.track.cues[0];

          // position first cue at the top of the displayed area
          // this should currently be ignored
          firstCue.line = 0;

          assert.isTrue(player.paused, 'player is paused');

          e.track.addEventListener(
            'cuechange',
            () => {
              const activeCue = e.track.activeCues[0];
              assert.equal(activeCue.line, 0, "the active cue's line was not updated");
              done();
            },
            { once: true }
          );

          media.currentTime = firstCue.startTime + 0.1;
        }, 10);
      }
    });

    return promise;
  });
});
