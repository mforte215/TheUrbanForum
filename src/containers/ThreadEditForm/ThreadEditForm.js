import React, { useState, useEffect }  from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import classes from './ThreadEditForm.module.css';
import * as threadActions from '../../store/actions/thread';


const ThreadEditForm = (props) => {
    let history = useHistory();
    let [postBody, setPostBody] = useState('');
    let [threadId, setThreadId] = useState('');
    let form = null;

    console.log(props);

    useEffect(() => {
        props.onLoadThreadData(props.match.params.id);
        setThreadId(props.match.params.id)
    }, [])


    const editThread = () => {
        const data = {
            token: props.token,
            content: postBody,
            threadId: threadId,
            thread: props.information.id,
            categoryId: props.information.category,
        }
        props.onChangeThreadData(data);
        history.push('/threads/' + threadId);

    }
    
    if(!props.loading) {
        form = (<div className={classes.editor}>
            <CKEditor
                editor={ ClassicEditor }
                data={props.information.body}
                onReady={ editor => {
                    
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setPostBody(data);
                } }
                onBlur={ ( event, editor ) => {
                    
                } }
                onFocus={ ( event, editor ) => {
                } }
            />
        </div>)
    

    }
    

    return (
        <div>
            <div className={classes.mainTitle}>
            <h1>Edit Thread</h1>
           
            
                <h3>{props.information.title}</h3>
                </div>
            <div className={classes.ThreadForm}>
            {form}
            <div className={classes.submitButton} >
            <button onClick={editThread}>Save Changes</button>
            </div>
        </div>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.thread.loading,
        error: state.thread.error,
        information: state.thread.information
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadThreadData: (id) => dispatch(threadActions.getThread(id)),
        onChangeThreadData:  (data) => dispatch(threadActions.updateThread(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadEditForm);