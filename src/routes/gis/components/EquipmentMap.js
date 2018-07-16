import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, Markers } from "react-amap";
import styles from "../style.less";

class EquipmentMap extends Component {
  constructor() {
    super();
    this.mapPlugins = ["ToolBar"];
    this.markersEvents = {
      click: (MapsOption, marker) => {
        // 获取marker 数据
        const extData = marker.getExtData();
        console.log(extData);
      }
    };
    // this.markerPosition = { longitude: 106.505968, latitude: 29.608018 }
  }

  renderMarkerLayout(extData) {
    if (extData.type === 1) {
      return <div className={styles.normalMarker} />;
    } else if (extData.type === 2) {
      return <div className={styles.offlineMarker} />;
    } else {
      return <div className={styles.errorMarker} />;
    }
  }

  render() {
    // const markerPosition = {
    //   longitude: this.props.gis.longitude,
    //   latitude: this.props.gis.latitude
    // };

    return (
      <Map
        amapkey={this.props.gis.AMAP_KEY}
        // center={markerPosition}
        plugins={this.mapPlugins}

        // zoom={12}
      >
        <Markers
          markers={this.props.gis.dataList}
          events={this.markersEvents}
          render={this.renderMarkerLayout}
        />
      </Map>
    );
  }
}

EquipmentMap.propTypes = {
  gis: PropTypes.object
};

export default EquipmentMap;
