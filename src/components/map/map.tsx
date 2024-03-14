import React, { useCallback, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import Box, { BoxProps } from '@mui/material/Box';

import { GOOGLE_MAP_API } from 'src/config-global';

import { mapStyle } from './styles';
import MapMarker from './map-marker';
import { MapOfficeProps } from './types';
import MapPopup from './map-popup';

interface Props extends BoxProps {
  office: MapOfficeProps;
}

export default function Map({ office, sx, ...other }: Props) {
  const [tooltip, setTooltip] = useState<MapOfficeProps | any>(null);

  const [centerMap, setCenterMap] = useState({
    lat: office.latlng[0],
    lng: office.latlng[1],
  });


  const handleOpen = useCallback(
    (lat: number, lng: number, office: MapOfficeProps) => {
      setCenterMap({
        ...centerMap,
        lat: lat - 32,
        lng,
      });
      setTooltip(office);
    },
    [centerMap]
  );
  return (
    <Box sx={{ height: 480, overflow: 'hidden', ...sx }} {...other}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API as string }}
        center={centerMap}
        zoom={2}
        options={{
          styles: mapStyle,
          disableDefaultUI: true,
        }}
      >

        <MapMarker
          lat={office.latlng[0]}
          lng={office.latlng[1]}
          onOpen={() => handleOpen(office.latlng[0], office.latlng[1], office)}
        />

        {tooltip && (
          <MapPopup
            lat={tooltip.latlng[0]}
            lng={tooltip.latlng[1]}
            office={tooltip}
            onClose={() => setTooltip(null)}
          />
        )}
      </GoogleMapReact>
    </Box>
  );
}
