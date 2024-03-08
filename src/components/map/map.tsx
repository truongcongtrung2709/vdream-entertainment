import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import Box from '@mui/material/Box';

import { GOOGLE_MAP_API } from 'src/config-global';

import { mapStyle } from './styles';
import MapMarker from './map-marker';

interface Tooltip {
  lat: number;
  lng: number;
}

export default function Map() {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const centerMap = {
    lat: 21.0515881,
    lng: 105.8420549,
  };

  const handleOpen = (lat: number, lng: number) => {
    setTooltip({ lat, lng });
  };

  return (
    <Box sx={{ height: 480, overflow: 'hidden', borderRadius: 2 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API }}
        defaultCenter={centerMap}
        defaultZoom={15}
        options={{
          styles: mapStyle,
          disableDefaultUI: true,
        }}
      >
        <MapMarker
          lat={centerMap.lat}
          lng={centerMap.lng}
          onOpen={() => handleOpen(centerMap.lat, centerMap.lng)}
        />

        {tooltip && (
          <Box sx={{ position: 'absolute', top: `${tooltip.lat}px`, left: `${tooltip.lng}px`, bgcolor: 'background.paper', p: 1, borderRadius: 2 }}>
            {`Latitude: ${tooltip.lat.toFixed(6)}, Longitude: ${tooltip.lng.toFixed(6)}`}
          </Box>
        )}
      </GoogleMapReact>
    </Box>
  );
}
