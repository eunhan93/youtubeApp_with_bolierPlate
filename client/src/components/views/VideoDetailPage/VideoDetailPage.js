import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {Row, Col, List} from 'antd'
import Axios from 'axios'
import Avatar from 'antd/lib/avatar/avatar'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
 
function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variable = {
        videoId
    }
    const [VideoDetail, setVideoDetail] = useState([])
    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(res => {
            if(res.data.success){
                setVideoDetail(res.data.videoDetail)
            } else {
                alert('동영상 불러오기 실패')
            }
        })
    }, [])
    if(VideoDetail.writer){
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding : '3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                        <List.Item
                            actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title = {VideoDetail.writer.name}
                                description ={VideoDetail.description}
                            />
                        </List.Item>
                        {/* comment */}
                    </div>
    
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else{
        return (
            <div>Loading....</div>
        )
    }
    
}

export default withRouter(VideoDetailPage)
