import React, {useEffect} from 'react';
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null) {

    // option
    // null => Anyone can enter
    // true => user who logged in can enter
    // false => user who logged in can not enter

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then(response => {
                // not login
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else { 
                    // login
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}