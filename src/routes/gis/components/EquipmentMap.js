import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, Marker } from "react-amap";

class EquipmentMap extends Component {
  constructor() {
    super();
    this.mapPlugins = ["ToolBar"];
    // this.markerPosition = { longitude: 106.505968, latitude: 29.608018 }
  }
  render() {
    const markerPosition = {
      longitude: this.props.gis.longitude,
      latitude: this.props.gis.latitude
    };
    return (
      <Map
        amapkey={this.props.gis.AMAP_KEY}
        center={markerPosition}
        plugins={this.mapPlugins}
        zoom={12}
      >
        <Marker position={markerPosition} />
      </Map>
    );
  }
}

EquipmentMap.propTypes = {
  gis: PropTypes.object
};

export default EquipmentMap;
