import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'

const ListItem = List.Item
const ListItemMeta = List.Item.Meta

const Detail = ({ gis, dispatch }) => {
  return <List
    header="设备详情"
    dataSource={gis.equitmentInfo}
    renderItem={item => (
      <ListItem>
        <ListItemMeta title={item.title} description={item.description}/> 
      </ListItem>
    )}
  />
}


Detail.propTypes = {
  gis: PropTypes.object,
  dispatch: PropTypes.func,
}


export default Detail
