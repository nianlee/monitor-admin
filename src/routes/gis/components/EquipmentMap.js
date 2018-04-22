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
    this.mapPlugins = ['ToolBar'];
    this.markerPosition = { longitude: 106.631015, latitude: 29.717099 }
  }
  render() {
    return <Map 
      amapkey={this.props.gis.AMAP_KEY} 
      center={this.markerPosition}
      plugins={this.mapPlugins}
      zoom={12}
    >
      <Marker position={this.markerPosition} />
    </Map>
  }
}


EquipmentMap.propTypes = {
  gis: PropTypes.object,
}


export default EquipmentMap
