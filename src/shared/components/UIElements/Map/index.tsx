import React, { useRef, useEffect } from "react";
import * as ol from "openlayers";
import styles from "./style.module.scss";

interface MapProps {
  style?: object;
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
}

const Map: React.FC<MapProps> = ({ center, zoom, style }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([center.lng, center.lat])), // Cordinates of New York's Town Hall
  });
  marker.setStyle(
    new ol.style.Style({
      image: new ol.style.Icon({
        crossOrigin: "anonymous",
        scale: 0.2,
        src:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS86RqmmWeCyYCAhRdFO3ktkbWZmD1larBLiuMqh-xQM9ukgv23&usqp=CAU",
      }),
    })
  );
  const vectorSource = new ol.source.Vector({
    features: [marker],
  });
  useEffect(() => {
    new ol.Map({
      target: mapRef.current!.id,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
          source: vectorSource,
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom, vectorSource]);

  return <div ref={mapRef} className={styles.map} style={style} id="map"></div>;
};

export default Map;
