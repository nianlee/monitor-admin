import React from 'react'
import PropTypes from 'prop-types'
import styles from './Block.less'

const Block = ({ children, style }) => {
  return (
    <div className={styles.block} style={style}>
      { children }
    </div>
  )
}

Block.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
}

export default Block
