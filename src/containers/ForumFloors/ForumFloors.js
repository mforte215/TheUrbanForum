import React, { useEffect, useContext } from 'react';
import ForumFloor from './ForumFloor/ForumFloor';
import * as floorsActions from '../../store/actions/floors';
import * as floorActions from '../../store/actions/floor';
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import classes from './ForumFloors.module.css';
const ForumFloors = (props) => {

const history = useHistory();

const categoryContext = useContext('')
    
useEffect(() => {
    props.onLoadFloors()
},[])

let floors = null;


    const loadFloor = (id, name) => {
        
        history.push({
            pathname: '/categories/' + name,
            state: { category: name}
          });
    }

    if(!props.loading) {
        floors = props.floors.map(floor => (
            <ForumFloor
                key={floor.id}
                id ={floor.id}
                name = {floor.name}
                clicked = {() => loadFloor(floor.id, floor.name)}
                />
        ));
    }

    return (<div>
        <div className={classes.mainTitle}>
        <h1 >Categories</h1>
        </div>
        <div className={classes.categories}>
            {floors}
        </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        floors: state.forum.floors,
        loading: state.forum.loading,
        isAuthenticated: state.auth.token !== null,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLoadFloors: () => dispatch(floorsActions.getFloors()),
        setFloorData: (id) => dispatch(floorActions.getFloor(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumFloors);