import React from 'react'
import PropTypes from 'prop-types'
import { Layout} from 'antd'
import { connect } from 'dva'

const { Content } =  Layout;
const Gis = ({
  gis,
}) => {

  return (
    <Layout>

      <Content>add map</Content>

    </Layout>
  )
}

Gis.propTypes = {
  gis: PropTypes.object,
}

export default connect(({ gis }) => ({ gis }))(Gis)
