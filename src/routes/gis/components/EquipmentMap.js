import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, Marker } from 'react-amap'

class EquipmentMap extends Component {
  constructor() {
    super()
    this.toolEvents = {
      created: (tool) => {
        this.tool = tool
      }
    }
    this.mapPlugins = ['ToolBar']
    // this.markerPosition = { longitude: 106.631015, latitude: 29.717099 }
  }
  render() {
    const markerPosition = {
      longitude: this.props.gis.longitude,
      latitude: this.props.gis.latitude,
    }
    return <Map 
      amapkey={this.props.gis.AMAP_KEY} 
      center={markerPosition}
      plugins={this.mapPlugins}
      zoom={12}
    >
      <Marker position={markerPosition} />
    </Map>
  }
}


EquipmentMap.propTypes = {
  gis: PropTypes.object,
}


export default EquipmentMap
