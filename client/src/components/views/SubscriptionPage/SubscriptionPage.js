import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Typography, Row, Col} from 'antd';
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment'

const { Title } = Typography

function SubscriptionPage() {

    const [subsVideo, setsubsVideo] = useState([])

    useEffect(() => {
        const subscriptionVariable = {
            userFrom : localStorage.getItem('userId')
        }
        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariable)
        .then(res => {
            if(res.data.success){
                // console.log(res.data);
                setsubsVideo(res.data.videos)
            } else{
                alert('비디오 불러오기 실패')
            }
        })
    }, [])

    const renderCards = subsVideo.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));
        return <Col lg={6} md={8} xs={24}>
            <a href={`/video/${video._id}`}>
                <div style={{position:'relative'}}>
                    <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
                    <div className='duration'>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>
        <br />
        <Meta
            avatar={
                <Avatar src = {video.writer.image} />
            }
            title={video.title}
            description=""
        />
        <span>{video.writer.name}</span>
        <span style={{marginLeft : '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAT).format('MMM Do YY')}</span>
    </Col>
    })
    return (
        <div style={{width : '85%', margin : '3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
                
            </Row>
        </div>
    )
}


export default withRouter(SubscriptionPage)
