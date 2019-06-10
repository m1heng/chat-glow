import React from 'react';
import PropTypes from "prop-types";
import {Card,Avatar, Typography, Grid} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    selfroot:{
        flexGrow: 1,
    },
    otherroot:{
        
    },
    av_name: {
        'text-align' : 'center',
        'margin-right': '1%'
    },
    av:{
        'margin': '0 auto'
    },
    ml:{
        'list-style': 'none',
        'padding-left': 0
    },
    mcard:{
        // background: 'lightBlue',
    }
  });


class Dialog extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { classes } = this.props;
        if(this.props.messages[0]['name'] === 'Me'){
            return(
                <div className={classes.slefroot}>
                    <Grid container spacing={2} direction="row"
                                                justify="flex-end"
                                                alignItems="center">
                        <Grid item xs={6}>
                            <Card className={classes.mcard}>
                                <ul className={classes.ml}>
                                    {this.props.messages.map((m , i)=>(
                                        <li key={i}>
                                        <Typography variant="body1" gutterBottom>
                                            {m.text}
                                        </Typography>
                                    </li>
                                    ))}
                                </ul>
                            </Card>
                        </Grid>
                        <Grid item xs={1} className={classes.av_name}>
                            <Avatar className={classes.av} srcSet={this.props.messages[0]['avatar']}></Avatar>
                            <Typography variant="caption" display="block" gutterBottom>
                                {this.props.messages[0]['name']}
                            </Typography>
                        </Grid>
                        
                    </Grid>
                </div>
                
            );
        }else{
            return(
                <div className={classes.slefroot}>
                    <Grid container spacing={2} direction="row"
                                                justify="flex-start"
                                                alignItems="center">
                        <Grid item xs={1} className={classes.av_name}>
                            <Avatar className={classes.av} srcSet={this.props.messages[0]['avatar']}></Avatar>
                            <Typography variant="caption" display="block" gutterBottom>
                                {this.props.messages[0]['name']}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <ul className={classes.ml}>
                                    {this.props.messages.map((m , i)=>(
                                        <li key={i}>
                                            <Typography variant="body1" gutterBottom>
                                                {m.text}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Grid>
                        
                        
                    </Grid>
                </div>
                
            );
        }
        
    }
}

Dialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default  withStyles(styles)(Dialog);