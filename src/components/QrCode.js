import React from 'react';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qrcode-logo';

// Renders a QR code within a wrapper that is standardised across different pages
const QrCodeComponent = ({
  url,
  logoUrl,
}) => (
  <div className="qrCodeContainer">
    <hr></hr>
    <a
      className="qrCodeLink"
      href={url}
    >
      <QRCode
        value={url}
        ecLevel={'M'}
        size={320}
        padding={10}
        bgColor={'#FFFFFF'}
        fgColor={'#070707'}
        logoImage={logoUrl}
        logoOpacity={1}
        logoWidth={100}
        logoHeight={50}
      ></QRCode>
    </a>
    <hr></hr>
  </div>
);

QrCodeComponent.propTypes = {
  url: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

export default QrCodeComponent;