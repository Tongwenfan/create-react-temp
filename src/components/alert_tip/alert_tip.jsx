import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './alert_tip.scss'

export default class AlertTip extends Component {
    static propTypes = {
        alertText: PropTypes.string.isRequired,  // 提示内容
        closeTip: PropTypes.func.isRequired,   // 关闭
        logout: PropTypes.func   // 退出
    }

    render() {
        return (
            <div className='alert-container'>
                <section className='tip-text-container'>
                    <div className='tip-icon'><span></span><span></span></div>
                    <div className='tip-text'>{this.props.alertText}</div>
                    {this.props.logout('wait') ?
                        <div className='logout'>
                            <div onClick={this.props.closeTip}>再等等</div>
                            <div onClick={this.props.logout}>狠心离开</div>
                        </div>
                        : <div className='confirm' onClick={this.props.closeTip}>确认</div>}
                </section>
            </div>
        )
    }
}
