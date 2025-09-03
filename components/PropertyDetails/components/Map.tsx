'use client';

import { Property } from '@/types/property';
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode';
import { useState, useEffect } from 'react';
import MapGl, { Marker } from 'react-map-gl/mapbox';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import { Spinner } from '@/components/Spinner';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  property: Property;
}

interface Viewport {
  longitude: number;
  latitude: number;
  zoom: number;
  width: string;
  height: string;
}

export const Map = ({ property }: MapProps) => {
  //TODO: useReducer
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | boolean>(false);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      setLoading(true);
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
        );

        if (res.results.length === 0) {
          setError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setViewport((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      } catch (e) {
        console.error(e);
        setError(!!e);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (error) return <div>No location data found</div>;

  if (loading) return <Spinner />;

  return (
    !loading && (
      <MapGl
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={viewport}
        style={{ width: '100%', height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <Image src={pin} alt="location-pin" width={40} height={40} />
        </Marker>
      </MapGl>
    )
  );
};
