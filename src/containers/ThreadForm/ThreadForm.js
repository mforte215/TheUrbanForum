import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import classes from './ThreadForm.module.css'
import * as actions from '../../store/actions/thread';
import * as CategoryActions from '../../store/actions/floors';
import { NavLink, Redirect } from 'react-router-dom';
const ThreadForm = (props) => {
    let redirect = null;

    
    let [postBody, setPostBody] = useState('');
    let [categoryId, setCategoryId] = useState(1);
    let [categoryName, setCategoryName ] = useState('Poltics');
    let [postTitle, setPostTitle] = useState('');

    

    useEffect(() => {
        props.onLoadCategories()

        if(props.location.state) {
        
         setCategoryId(props.location.state.catId);
         setCategoryName(props.location.state.catName);
        }
    },[])
    
    let categories = null;

    const history = useHistory();


    if(!props.loading) {

        categories = props.categories.map(floor => {

                return (
                    <option
                        key= {floor.id}
                        name = {floor.name}
                        value={floor.id}>
                        {floor.name}
                        </option>
                    );
            });
        }

    const addPost = () => {
        const data = {
            token: props.token,
            content: postBody,
            category: categoryId,
            title: postTitle,
        }
        props.onPostSubmit(data);
        
        console.log('Checking category name');
        console.log(categoryName);
        history.push('/categories/' + categoryName);
    }


    let form = (<div className={classes.editor}>
    <CKEditor
        editor={ ClassicEditor }
        data=""
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

    return (
        <div>
            {redirect}
            <div className={classes.mainTitle}>
            <h1>Add New Thread</h1>
            </div>
            <div className={classes.postTitle}>
            <table>
                <tbody>
                <tr>
                    <th className={classes.firstcolumn}><label>Category:</label></th>
                    <th>
                    <select value={parseInt(categoryId)} 
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                        setCategoryName(e.target.selectedOptions[0].textContent);
                    } }>
                    {categories}
                    </select>
                    </th>
                </tr>
                <tr>
                    <th className={classes.firstcolumn}><label>Thread Title:</label></th>
                    <th><input onChange={(e) => setPostTitle(e.target.value)} type="text" /></th>
                </tr>
                </tbody>
            </table>
            </div>
            <div className={classes.ThreadForm}>
            {form}
            <div className={classes.submitButton} >
            <button onClick={addPost}>Post Discussion</button>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.userId,
        loading: state.thread.loading,
        authload: state.auth.loading,
        error: state.thread.error,
        isAuthenticated: state.auth.token !== null,
        categories: state.forum.floors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadCategories: () => dispatch(CategoryActions.getFloors()),
        onPostSubmit: (data) => dispatch(actions.postThread(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadForm);