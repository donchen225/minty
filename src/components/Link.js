import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { usePlaidLink } from "react-plaid-link";
import { linkInstitution } from '../actions/accounts';
import axios from '../services/index';
import { SET_LINK_TOKEN } from "../actions/types";

const Link = () => {
    const dispatch = useDispatch();

    const institutions = useSelector(state => state.accounts.institutions);
    const linkToken = localStorage.getItem('link_token');

    useEffect(() => {
        const createLinkToken = async () => {
            console.log("createLinkToken is called");
            const res = await axios.post("/link/token/create");
            console.log("link token", res.data.link_token);
            dispatch({ type: SET_LINK_TOKEN, payload: res.data.link_token });
        }
        createLinkToken();
    }, []);

    // link institution
    const onSuccess = useCallback((public_token, metadata) => {
        console.log("handleOnSuccess is called");
        console.log("public_token", public_token);
        // This will send public_token to server, exchange it for access_token and item_id, create institution doc to store access_token and item_id, fetch all of the institution's accounts from Plaid API using access_token, and create account doc for each account
        dispatch(linkInstitution({ metadata, institutions }));
    }, []);

    const configs = {
        token: linkToken,
        onSuccess
    }

    const { open, ready, error } = usePlaidLink(configs);

    return (
    <>
        <button onClick={() => open()} disabled={!ready || error}>
            Connect a bank account
        </button>
    </>
    )
}

export default Link;
