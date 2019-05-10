import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import API from "../../api";
import PropTypes from 'prop-types'
import {is, fromJS} from 'immutable';  // 保证数据的不可变
import './shop_list.scss'

export default class ShopList extends Component {
    static propTypes = {
        geohash: PropTypes.array.isRequired  // 经纬度信息
    }
    state = {
        shopListArr: []  // 商店列表
    }

    getShopList = async (props) => {
        let obj = {
            latitude: props.geohash[0],
            longitude: props.geohash[1]
        }
        const shopListArr = await API.getShopList(obj)
        this.setState({shopListArr: shopListArr})
    }

    componentWillMount() {
        if (this.props.geohash.length) {
            this.getShopList(this.props)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let refresh = !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
        if (refresh) {
            this.getShopList(nextProps)
        }
        return refresh
    }

    starCount = (rating) => {
        const items = [];
        for (let i = 0; i < Math.ceil(rating); i++) {
            items.push(<div className='icon-wuxing' key={i}/>)
        }
        return items
    }

    render() {
        return (
            <div className='shoplist-container'>
                <ul>
                    {this.state.shopListArr.map((item, index) => {
                        return (
                            <Link to={'/shop/' + item.id} className='shop-item' key={'1' + index}>
                                <img src={"http://elm.cangdu.org/img/" + item.image_path} alt="img"/>
                                <div className='shop-content'>
                                    <div className='shop-content-title'>
                                        <div className='title-left'>
                                            <span>品牌</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <div className='title-right'>保准票</div>
                                    </div>
                                    <div className='shop-content-title'>
                                        <div className='title-left'>
                                            <div className='star-num'>
                                                {this.starCount(item.rating)}
                                            </div>
                                            <div className='star-rating'>
                                                {item.rating}
                                            </div>
                                            <div className='order-num'>
                                                月售{item.recent_order_num}单
                                            </div>
                                        </div>
                                        <div className='title-right order-badge'>
                                            <span>蜂鸟专送</span>
                                            <span>准时达</span>
                                        </div>
                                    </div>
                                    <div className='shop-content-title'>
                                        <div className='fee-left'>
                                            <span className='fee-text'>¥{item.float_minimum_order_amount}起送</span>
                                            <span className='segmentation'>/</span>
                                            <span className='fee-text'>{item.piecewise_agent_fee.tips}</span>
                                        </div>
                                        <div className='fee-right'>
                                            <span>{item.distance}</span>
                                            <span>/</span>
                                            <span>{item.order_lead_time}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }

}
