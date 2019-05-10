import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './footer.scss'
import '../../assets/iconfont/iconfont.js';

export default class Footer extends Component {
    render() {
        return (
            <section className='footer-container'>
                <NavLink className='guide-item' to='/msite'>
                    <div className='icon-changyonglogo40 icon-style'/>
                    <span className='spec-text'>外卖</span>
                </NavLink>
                <NavLink className='guide-item' to='/about'>
                    <div className='icon-zhinanzhen icon-style'/>
                    <span>搜索</span>
                </NavLink>
                <NavLink className='guide-item' to='/about'>
                    <div className='icon-dingdan icon-style'/>
                    <span>订单</span>
                </NavLink>
                <NavLink className='guide-item' to='/profile'>
                    <div className='icon-account icon-style'/>
                    <span>我的</span>
                </NavLink>
            </section>
        )
    }
}
