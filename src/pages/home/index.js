import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { actionCreators } from './store'

class Home extends PureComponent {
  componentDidMount () {
    this.props.changeHomeData()
    this.bindEvents()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

  handleScrollTop () {
    window.scrollTo(0, 0)
  }

  bindEvents () {
    // 注意给 window 绑定事件 在 组件销毁时 需移除
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  render () {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" src="//upload.jianshu.io/admin_banners/web_images/4592/22f5cfa984d47eaf3def6a48510cc87c157bf293.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="" />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        {
          this.props.showScroll && <BackTop onClick={ this.handleScrollTop }>回到顶部</BackTop>
        }
      </HomeWrapper>
    )
  }
}

const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
  changeHomeData () {
    dispatch(actionCreators.getHomeInfo())
  },
  changeScrollTopShow () {
    if (document.documentElement.scrollTop > 400) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})

export default connect(mapState, mapDispatch)(Home)