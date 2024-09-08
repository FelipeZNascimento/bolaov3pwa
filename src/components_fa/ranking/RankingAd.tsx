import React from 'react';

export default class AdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9713954775329576"
        data-ad-slot="2776132415"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }
}
