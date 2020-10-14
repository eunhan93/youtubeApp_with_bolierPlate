import React,{useState, useEffect} from 'react'
import Axios from 'axios'

function Subscribe(props) {
    const variable = {userTo: props.userTo, userFrom: props.userFrom}

    const [SubscriberNumber, setSubscriberNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    useEffect(() => {
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(res => {
            if(res.data.success){
                console.log(res.data.subscriberNumber);
                setSubscriberNumber(res.data.subscriberNumber)
            } else{
                alert('구독X')
            }
        })

        Axios.post('/api/subscribe/subscribed', variable)
        .then(res => {
            if(res.data.success){
                setSubscribed(res.data.subscribed)
            } else{
                alert ('실패')
            }
        })
    }, [])
    const onSubscribe = () => {

        
        if (Subscribed) { //구독 중이고 취소하려고 할때
            Axios.post('/api/subscribe/unSubscribe', variable)
            .then(res => {
                if(res.data.success){
                    setSubscriberNumber(SubscriberNumber - 1)
                    setSubscribed(!Subscribed)
                } else{
                    alert('구취실패')
                }
            })
        } else{ // 구독 전 구독하려고 할 때
            Axios.post('/api/subscribe/subscribe', variable)
            .then(res => {
                if(res.data.success){
                    setSubscriberNumber(SubscriberNumber + 1)
                    setSubscribed(!Subscribed)
                } else{
                    alert('구독O')
                }
            })
        }
    }
    return (
        <button style={{
                            backgroundColor : `${Subscribed ? '#aaaaaa' : '#cc0000'}`,
                            borderRadius : '4px',
                            color : 'white',
                            padding : '10px 16px',
                            fontWeight : '500',
                            fontSize : '1rem',
                            textTransform : 'uppercase',
                            border : 'none'
                        }} 
                onClick={onSubscribe}
        > 
        {SubscriberNumber ? SubscriberNumber : ""} {Subscribed ? "Subscribed" : 'Subscribe'}

        </button>
    )
    
    
}

export default Subscribe
