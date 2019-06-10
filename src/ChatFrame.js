import React from "react";
import Axios from "axios";
import { Typography } from "@material-ui/core";
import Dialog from "./Components/Dialog";
import { TimeStampInterval, ChatAPIUrl} from "./Constants";

function restruct_history(chat_history){
    var res = [];
    var buffer = {
        'pre_name' : null,
        'pre_time' : 0,
        'chats' : []
    };
    Object.keys(chat_history).forEach((key,idx)=>{

        var current_chat = chat_history[key];
        current_chat['key'] = key;

        if(buffer['pre_name'] === null){
            res.push(new Date(parseInt(current_chat['time'])));
            buffer['pre_name'] = current_chat['name'];
            buffer['pre_time'] = parseInt(current_chat['time']);
            buffer['chats'].push(current_chat);
        }else{
            if( parseInt(current_chat['time']) - buffer['pre_time']  > TimeStampInterval * 100){
                //add time tag and chats in buffer to res
                res.push(buffer['chats']);
                res.push(new Date(parseInt(current_chat['time'])));

                //update buffer
                buffer  = {
                    'pre_name': current_chat['name'],
                    'pre_time': parseInt(current_chat['time']),
                    'chats' : [current_chat]
                };
                
            }else if(buffer['pre_name'] !== current_chat['name']){
                res.push(buffer['chats']);

                //update buffer
                buffer  = {
                    'pre_name': current_chat['name'],
                    'pre_time': parseInt(current_chat['time']),
                    'chats' : [current_chat]
                };
            }else{
                buffer['chats'].push(current_chat);
                buffer['pre_time'] = parseInt(current_chat['time']);
            }
        }


    });
    res.push(buffer['chats']);
    return res;
}


class ChatFrame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chat_history : [] ,
            loading_flag : true
        };
    }

    componentDidMount(){
        Axios({
            url : ChatAPIUrl,
            method : 'GET'
        }).then(response =>{
            return response.data
        }).then(data =>{
            this.setState({
                chat_history : restruct_history(data),
                loading_flag: false
            }); 
            console.log(this.state.chat_history);
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.loading_flag ? 
                    <p>loading</p> :
                    this.state.chat_history.map((item, idx) =>{
                        if(item instanceof Date){
                            return <Typography variant="subtitle2" key={idx}>{item.toLocaleString()}</Typography>
                            
                        }else{
                            return (<div key={idx}>
                            <Dialog messages={item}></Dialog>
                            </div>)
                        }
                    })
                }
            </div>


            
            );
    }
}

export default ChatFrame;