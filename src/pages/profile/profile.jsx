import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {is, fromJS} from 'immutable';  // 保证数据的不可变
import PropTypes from 'prop-types'
import API from '../../api'
import {saveUserInfo} from '../../store.js'
import {getStore, getImgPath} from "../../utils/commons";
import './profile.scss'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import AlertTip from "../../components/alert_tip/alert_tip";

class Profile extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        saveUserInfo: PropTypes.func.isRequired
    }
    state = {
        username: '登录/注册',
        mobile: '暂无绑定手机',
        imgpath: '',    // 图片路径
        balance: 0,     //我的余额
        count: 0,       //优惠券个数
        pointNumber: 0, //积分数
        hasAlert: '',   // tip是否显示
        alertText: '请在手机APP中打开',
    }
    initdata = () => {
        let newState = {}
        if (this.props.userInfo && this.props.userInfo.user_id) {
            newState.mobile = this.props.userInfo.mobile || '暂无手机绑定'
            newState.username = this.props.userInfo.username
            newState.balance = this.props.userInfo.balance
            newState.count = this.props.userInfo.gift_amount
            newState.pointNumber = this.props.userInfo.point
        } else {
            newState.mobile = '暂无手机绑定'
            newState.username = '登录/注册'
        }
        this.setState(newState)
    }
    handleClick = (type) => {
        let alertText
        switch (type) {
            case 'download':
                alertText = '请到官方网站下载'
                break
            case 'unfinished':
                alertText = '功能尚未开发'
                break
            default:
        }
        this.setState({
            hasAlert: !this.state.hasAlert, alertText
        })
    }
    getUserInfo = async () => {
        let userInfo = await API.getUser({user_id: getStore('user_id')})
        userInfo.imgpath = userInfo.avatar.indexOf('/') !== -1 ?
            '/img/' + userInfo.avatar : getImgPath()
        this.props.saveUserInfo(userInfo)
        this.initdata()
    }

    goBack = () => this.props.history.goBack()

    componentDidMount() {
        if (!this.props.userInfo.user_id) {
            this.getUserInfo()
        } else {
            this.initdata()
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!is(fromJS(this.props.proData), fromJS(nextProps.proData)))
            this.initdata(nextProps)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !is(fromJS(this.props), fromJS(nextProps)
            || !is(fromJS(this.state), fromJS(nextState)))
    }

    render() {
        return (
            <div className='profile-container'>
                <Header title="我的" key='s1'/>
                <section key='s2'>
                    <section className='profile-number'>
                        <Link to={this.props.userInfo && this.props.userInfo.user_id ? '/info' : '/login'}
                              className='profile-link'>
                            {this.props.userInfo.imgpath ?
                                <img src={this.props.userInfo.imgpath} alt='img' className='private-image'/> : ''}
                            <div className='user-info'>
                                <div>{this.state.username}</div>
                                <div>
                                    <div className='icon-tel'/>
                                    <span className='icon-mobile-number'>{this.state.mobile}</span>
                                </div>
                            </div>
                            <div className='icon-arrow-right'/>
                        </Link>
                    </section>
                    <section className='info-data' key='i1'>
                        <ul className='clear'>
                            <Link to='/balance' className='info-data-link'>
                                <span className='info-data-top'><b>{parseInt(this.state.balance).toFixed(2)}</b>元</span>
                                <span className='info-data-bottom'>我的余额</span>
                            </Link>
                            <Link to='/balance' className='info-data-link'>
                                <span className='info-data-top'><b>{this.state.count}</b>个</span>
                                <span className='info-data-bottom'>我的优惠</span>
                            </Link>
                            <Link to='/balance' className='info-data-link'>
                                <span className='info-data-top'><b>{this.state.pointNumber}</b>分</span>
                                <span className='info-data-bottom'>我的积分</span>
                            </Link>
                        </ul>
                    </section>
                    <section className='profile-list'>
                        <div onClick={this.handleClick.bind(this, 'unfinished')} className='myorder' key='i2'>
                            <div className='icon-dingdan order-icon'/>
                            <div className='myorder-text'>
                                <span>我的订单</span>
                                <div className='icon-arrow-right'/>
                            </div>
                        </div>
                        <a href="https://home.m.duiba.com.cn/#/chome/index" className='myorder' key='i3'>
                            <div className='icon-jifen1 order-icon'/>
                            <div className='myorder-text'>
                                <span>积分商城</span>
                                <div className='icon-arrow-right'/>
                            </div>
                        </a>
                        <div onClick={this.handleClick.bind(this, 'unfinished')} className='myorder' key='i4'>
                            <div className='icon-huangguan order-icon'/>
                            <div className='myorder-text'>
                                <span>饿了么会员卡</span>
                                <div className='icon-arrow-right'/>
                            </div>
                        </div>
                        <div onClick={this.handleClick.bind(this, 'unfinished')} className='myorder' key='i5'>
                            <div className='icon-yk_fangkuai_fill order-icon'/>
                            <div className='myorder-text'>
                                <span>服务中心</span>
                                <div className='icon-arrow-right'/>
                            </div>
                        </div>
                        <div onClick={this.handleClick.bind(this, 'download')} className='myorder' key='i6'>
                            <div className='icon-changyonglogo40 order-icon'/>
                            <div className='myorder-text'>
                                <span>下载饿了么APP</span>
                                <div className='icon-arrow-right'/>
                            </div>
                        </div>
                    </section>
                </section>
                <Footer key='s3'/>
                {this.state.hasAlert &&
                <AlertTip alertText={this.state.alertText} closeTip={this.handleClick}
                          logout={() => {
                              return false
                          }}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (state)
        return {userInfo: state.userInfo}
    else
        return {userInfo: {}}
}

const mapDispatchToProps = (dispatch) => {
    return {saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo))}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
