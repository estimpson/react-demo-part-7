import * as defs from '../definitions/definitions';
import { Action, ActionTypes } from '../actions/actionTypes';
import { combineReducers, Reducer } from 'redux';

const initialUserState: defs.State['users'] = null;

export const userReducer: Reducer<defs.State['users'], Action> = (
    state = initialUserState,
    action,
) => {
    switch (action.type) {
        case ActionTypes.LOAD_USERS: {
            return action.users;
        }
    }
    return state;
};

const initialChannelState: defs.State['channels'] = null;

export const channelReducer: Reducer<defs.State['channels'], Action> = (
    state = initialChannelState,
    action,
) => {
    switch (action.type) {
        case ActionTypes.LOAD_CHANNELS: {
            return action.channels;
        }
    }
    return state;
};

export const rootReducer = combineReducers<defs.State, Action>({
    users: userReducer,
    channels: channelReducer,
});
