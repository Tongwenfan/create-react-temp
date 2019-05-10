import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RecommendWrapper, RecommendItem } from '../style'

class Recommend extends PureComponent {
  render () {
    const { list } = this.props
    return (
      <RecommendWrapper>
        {
          list.map((item) => (
            <RecommendItem key={ item.get('id') } imgUrl={ item.get('imgUrl') } />
          ))
        }
      </RecommendWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recommend)