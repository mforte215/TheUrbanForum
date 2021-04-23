import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as threadActions from '../../store/actions/thread';
import * as commentActions from '../../store/actions/comment';
import dompurify from 'dompurify';
import classes from './Thread.module.css';
import Comment from '../Comment/Comment';
import { THREAD_EDIT_SUCCESS } from '../../store/actions/actionTypes';




const Thread  = (props) => {

    let [comment, setComment] = useState('');
    let [editing, setEditing] = useState(false);
    const history = useHistory();
    

    let comments = null;
    useEffect(() => {
        props.onLoadThread(props.match.params.id);
        props.onLoadComment(props.match.params.id);
        
    }, []);

    let addButton = null;
    let commentBox = null;

    const addComment = () => {
        const data = {
            token: props.token,
            content: comment,
            forumThread: props.match.params.id,
            createdBy: props.user
        }
        props.onAddComment(data);
        setComment('');
        
    }

    const editComment = (data) => {

        
        
    }

    const deleteComment = (commentId) => {
        let data = {
            commentId: commentId,
            token: props.token,
            forumThread: props.match.params.id,
        }
        props.onDeleteComment(data);
    }


    if(props.token) {
        addButton = <button className={classes.addCommentBtn} onClick={addComment} >Add Reply</button>;
        commentBox = (            <div className={classes.editor}>
            <CKEditor
                editor={ ClassicEditor }
                data=""
                config={
                    {
                      link: {
                            defaultProtocol: 'http://',
                        },
                        ckfinder: {
                            options: {
                                resourceType: 'Images'
                            }
                      }
                    }}
                onReady={ editor => {
                    
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setComment(data);
                } }
                onBlur={ ( event, editor ) => {
                    
                } }
                onFocus={ ( event, editor ) => {
                
                } }
            />
        </div>

        )
    }


    const santizeContent = (content) => {
        const cleanInput = dompurify.sanitize(content);
        return cleanInput;
    }
    
    const setContent = (wrapper) => {
        wrapper = santizeContent(wrapper);
        return {__html: wrapper}
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

    if(!props.loading) {
        if (props.comments) {
            comments = props.comments.map(comment =>
                {
                    console.log('Logging props.user');
                    console.log(props.user);
                    console.log('Logging comment.username');
                    console.log(comment.username);
                    return (
                        <Comment
                            key={comment.id}
                            id ={comment.id}
                            owner={comment.username}
                            content={comment.content}
                            isOwner={(props.user === comment.username)}
                            createdAt = {comment.createdAt}
                            click={() => deleteComment(comment.id)}
                            />
                    ) 
                } );
        }
    }




    return (
        <div className={classes.threadHolder}>
            <h3 className={classes.Breadcrumb}><NavLink to='/'>Categories</NavLink> > <NavLink to={'/categories/' + props.information.categoryName}>{props.information.categoryName}</NavLink></h3>
            <div className={classes.mainTitle}>
            <h1>{props.information.title}</h1>
            </div>
            
            <div dangerouslySetInnerHTML={setContent(props.information.body)} className={classes.mainContent} />
            {comments}
            {commentBox}
                    {addButton}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.userid,
        loading: state.thread.loading,
        error: state.thread.error,
        information: state.thread.information,
        commentLoading: state.comment.loading,
        commentError: state.comment.error,
        comments: state.comment.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadThread: (id) => dispatch(threadActions.getThread(id)),
        onAddComment: (data) => dispatch(commentActions.postComment(data)),
        onLoadComment: (id) => dispatch(commentActions.getComments(id)),
        onDeleteComment: (data) => dispatch(commentActions.deleteComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);