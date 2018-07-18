import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, Markers } from "react-amap";
import styles from "../style.less";

class EquipmentMap extends Component {
  constructor(props) {
    super(props);
    this.mapPlugins = ["ToolBar"];
    this.markersEvents = {
      click: (mapsOption, marker) => {
        // 获取marker 数据
        const extData = marker.getExtData();
        props.dispatch({
          type: "gis/queryDeviceSelective",
          payload: { deviceSn: extData.sn }
        });
      }
    };
  }

  renderMarkerLayout(extData) {
    if (extData.state == "1") {
      return <div className={styles.normalMarker} />;
    } else if (extData.state == "0") {
      return <div className={styles.offlineMarker} />;
    } else {
      return <div className={styles.errorMarker} />;
    }
  }

  render() {
    const { equitmentInfo } = this.props.gis;
    let markerPosition = {};
    if (equitmentInfo.longitude) {
      markerPosition = {
        longitude: equitmentInfo.longitude,
        latitude: equitmentInfo.latitude
      };
    }

    return (
      <Map
        amapkey={this.props.gis.AMAP_KEY}
        center={markerPosition}
        plugins={this.mapPlugins}
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
  gis: PropTypes.object,
  dispatch: PropTypes.func
};

export default EquipmentMap;
