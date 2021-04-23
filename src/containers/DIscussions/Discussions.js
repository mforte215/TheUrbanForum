import React, {useEffect, useState} from 'react';
import Discussion from './Discussion/Discussion';
import * as floorActions from '../../store/actions/floor';
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import classes from './Discussions.module.css';

const Discussions = (props) => {

    const history = useHistory();
    let threads = null;
    let title = null;
    useEffect(() => {
        props.onLoadCategory(props.match.params.id);
        
    }, [])

    const loadDiscussion = (threadId) => {
        console.log('Thread ID');
        console.log(threadId);
        history.push('/threads/' + threadId);
    }

    let addNewThreads = null;

    const addNewThread = () => {
        const catId = props.category.id;
        const catName = props.category.name;
        history.push({
            pathname: '/threads/new',
            state: {
               catId: catId,
               catName: catName,
            }
          });
    }

    if(props.isAuthenticated) {
        addNewThreads = <div className={classes.NewButton}><button onClick={addNewThread}>Add New Thread</button></div>
    }

    if(props.error)
    {
        return (
            <div>
            <h1>SORRY, COULD NOT FIND THAT</h1>
            <h2><NavLink to='/'>Return Home</NavLink></h2>
        </div>
        )
    }

    const deleteThreadFunc = (token, threadId) => {
        const data = {
            token: token,
            categoryName: props.category.name,
            threadId: threadId,
        }
        props.onDeleteThread(data);
        history.push('categories/' + props.category.name);
    }

    const editThreadFunc = (threadId) => {
        history.push('/threads/' + threadId + '/edit/')
    }

    
    if(!props.loading) {
        if (props.category) {

            title = (<div className={classes.mainTitle}>
                    <h1 >{props.category.name}</h1>
                    </div>)
        
        if (props.category.categorythreads) {
            
            threads = props.category.categorythreads.map(thread =>
                {
                    console.log(thread);

                    return  (
                        <Discussion
                            key = {thread.id}
                            id = {thread.id}
                            name = {thread.title}
                            username = {thread.username}
                            createdAt = {thread.createdAt}
                            isOwner = {props.user === thread.username}
                            clicked = {() => loadDiscussion(thread.thread_identifier)}
                            editClick = {() => editThreadFunc(thread.thread_identifier) }
                            deleteClick = {() => deleteThreadFunc(props.token, thread.id)}
                            />
                    )
                }
                
            );
        }
    }
    }
    else {
        return (
            <p>Loading...</p>
        )
    }

    
    return (
        <div className={classes.background}>

        
        <div className={classes.ThreadList}>
            {title}
            {addNewThreads}
            
            {threads}
        </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.floor.loading,
        error: state.floor.error,
        category: state.floor.category,
        isAuthenticated: state.auth.token !== null,
        user: state.auth.userid,
        

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategory: (name) => dispatch(floorActions.getCategory(name)),
        onDeleteThread: (data) => dispatch(floorActions.deleteThread(data)),
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(Discussions);