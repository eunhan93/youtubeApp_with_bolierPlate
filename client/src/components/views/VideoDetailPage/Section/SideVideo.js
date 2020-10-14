import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Axios from 'axios'

function SideVideo() {
    const [sideVideos, setsideVideos] = useState([])
    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(res => {
            if(res.data.success){
                setsideVideos(res.data.videos)
            } else{
                alert('비디오 불러오기 실패')
            }
        })
    }, [])

    const renderSideVideos = sideVideos.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));
        return  <div key={index} style={{display:'flex', marginBottom:'1rem', padding:'0 2rem'}}>
                    <div style={{width:'40%', marginBottom:'1rem', marginRight:'1.5rem'}}>
                        <a href={`/video/${video._id}`}>
                            <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt={video.title} />
                        </a>
                    </div>
                    <div style={{width:'50%'}}>
                        <a href={`/video/${video._id}`} style={{color:'gray'}}>
                            <span style={{fontSize:'1.15rem', color:'black', display:'block', marginBottom : '1rem'}}>{video.title}</span>
                            <span>{video.writer.name}</span><br />
                            <span>{video.views} views</span><br />
                            <span>{minutes} : {seconds}</span>
                        </a>
                    </div>
                </div>
    })
    return (
        <React.Fragment>
            <div style={{marginTop:'3rem'}}>
            {renderSideVideos}
            </div>
        </React.Fragment>
        
    )
}

export default withRouter(SideVideo)