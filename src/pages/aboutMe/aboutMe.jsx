import React, {Component} from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

export default class AboutMe extends Component {
    goBack = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='about-container'>
                <Header title='介绍'/>
                <div className="tech-list" style={{height: 100,padding:45}}>
                    饿了吗
                </div>
                <Footer/>
            </div>
        )
    }
}
