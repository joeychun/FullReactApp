import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import WithRouter from '../../../routerCode/withRouterSample';
import * as actionCreators from '../../../store/actions/index';

import './RealDetail.css';

const RealDetail = (props) => {
    const { id } = useParams();
    useEffect(() => {
        props.onGetTodo(parseInt(id));
    }, []);

    let title = ''; let content = '';
    if (props.selectedTodo) {
        title = props.selectedTodo.title;
        content = props.selectedTodo.content;
    }

    return (
        <div className="RealDetailBox">
            <div className="title">TODO Detail</div>
            <div className="RealDetail" >
                <div className="row">
                    <div className="left">
                        Name:
                    </div>
                    <div className="right">
                        {title}
                    </div>
                </div>

                <div className="row">
                    <div className="left">
                        Content:
                    </div>
                    <div className="right">
                        {content}
                    </div>
                </div>
                <div className="BottomLink">
                    <NavLink to='/todos' exact>
                        <button>Back</button>
                    </NavLink>
                </div>
            </div >
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedTodo: state.td.selectedTodo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTodo: (id) =>
            dispatch(actionCreators.getTodo(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(RealDetail));
