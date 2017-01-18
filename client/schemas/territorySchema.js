import React, {PropTypes} from 'react';

export default PropTypes.shape({
  address_components: PropTypes.array,
  adr_address: PropTypes.string,
  formatted_address: PropTypes.string,
  geometry: PropTypes.shape({
    location: PropTypes.object,
    viewport: PropTypes.object
  }),
  html_attributions: PropTypes.array,
  icon: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  photos: PropTypes.array,
  place_id: PropTypes.string,
  reference: PropTypes.string,
  scope: PropTypes.string,
  types: PropTypes.array,
  url: PropTypes.string,
  utc_offset: PropTypes.number,
  vicinity: PropTypes.string
});
