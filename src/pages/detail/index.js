import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DetailWrapper, Header, Content } from './style'
import { actionCreators } from './store'

class Detail extends PureComponent {
  componentDidMount () {
    this.props.getDetail(this.props.match.params.id)
  }

  render () {
    const { title, content } = this.props
    return (
      <DetailWrapper>
        <Header>{ title }</Header>
        {/* 防止被转义 content 的内容应该这么取 */}
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </DetailWrapper>
    )
  }
}

const mapState = (state) => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content']),
})

const mapDispatch = (dispatch) => ({
  getDetail (id) {
    dispatch(actionCreators.getDetail(id))
  }
})

export default connect(mapState, mapDispatch)(withRouter(Detail))