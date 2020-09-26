import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Contents.css';

function Channel(props) {
    const secnondary = `Subscriber: ${props.channelDetail.statistics.subscriberCount}`
    const channelLink = "https://www.youtube.com/channel/" + props.channelDetail.id

    return (
        <React.Fragment >
            <ListItem button href={channelLink}>
                <ListItemAvatar>
                    <Avatar alt="Profile Picture"
                        src={props.channelDetail.snippet.thumbnails.default.url} />
                </ListItemAvatar>
                <ListItemText primary={props.channelDetail.snippet.title}
                    secondary={secnondary} />
            </ListItem>
        </React.Fragment >
    )
}




export default class Contents extends React.Component {
    API_KEY = 'AIzaSyA3TdtBJ5bJiYMpbfC6YMgpeDI4GMlsrbM'
    classes = this.useStyles
    constructor(props) {
        super(props);
        this.state = {
            channelDetails: [],
            loading: true,
        }
    }

    componentDidMount() {
        // this.fetchChannels()
        //     .then(async channels => await this.fetchChannelDetail(channels))
        //     .then(channelDetails => {
        //         this.setState(() => ({
        //             channelDetails,
        //             loading: false
        //         }))
        //     })
        //     .catch(e => console.log(e))


    }
    fetchChannels() {
        const searchURI =
            encodeURI(`https://www.googleapis.com/youtube/v3/search` +
                `?key=${this.API_KEY}&part=snippet&q=travel&type=channel&maxResults=20`)
        return fetch(searchURI)
            .then((channels) => channels.json())
            .catch((error) => {
                console.warn(error)
                console.warn(error)
            });
    }

    async fetchChannelDetail(channels) {
        const channelURI =
            encodeURI(`https://www.googleapis.com/youtube/v3/channels` +
                `?key=${this.API_KEY}&part=snippet,statistics&id=`)
        let channelDetails = []
        console.log('channels', channels)
        for (const channel of channels.items) {
            await fetch(channelURI + channel.id.channelId)
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    channelDetails.push(data.items[0])
                })
                .catch((error) => {
                    console.warn(error)
                });
        }
        return channelDetails
    }

    render() {
        if (this.state.loading === true) {
            return (
                <CircularProgress />
            )
        }


        return (
            <Paper square className="paper">
                <List className="list">
                    {
                        this.state.channelDetails.map(channelDetail => (
                            <Channel channelDetail={channelDetail} key={channelDetail.id} />
                        ))
                    }
                </List >
            </Paper>
        )
    }
}