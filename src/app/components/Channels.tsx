import * as React from 'react';
import * as defs from '../definitions/definitions';
import { Dispatch } from 'react';
import { Action, ActionTypes } from '../actions/actionTypes';
import { connect } from 'react-redux';

// Properties received from parent component, in this case none
interface params {}

// Data to be received from the Redux store
interface connectedState {
    channels: defs.Channel[] | null;
}

// Callback methods for actions to be dispatched
interface connectedDispatch {
    reloadChannels: () => Promise<void>; // (TBD)
}

// Map the Redux store to the connectedState
const mapStateToProps = (state: defs.State): connectedState => ({
    channels: state.channels,
});

// Hardcoded list of channels that would be retrieved from an API in a production application
const tempChannels: defs.Channel[] = [
    {
        channelId: 1,
        displayName: 'General',
        canAnyoneInvite: true,
        isActiveDirectMessage: false,
        isGeneral: true,
        isPublic: true,
        ownerId: null,
    },
    {
        channelId: 2,
        displayName: 'Random',
        canAnyoneInvite: true,
        isActiveDirectMessage: false,
        isGeneral: false,
        isPublic: true,
        ownerId: 1,
    },
    {
        channelId: 3,
        displayName: 'Secret',
        canAnyoneInvite: false,
        isActiveDirectMessage: false,
        isGeneral: false,
        isPublic: false,
        ownerId: 1,
    },
];

// Generate callback(s) for the Redux store.
const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    reloadChannels: async () => {
        //TODO: load data from server

        dispatch({
            type: ActionTypes.LOAD_CHANNELS,
            channels: tempChannels,
        });
    },
});

// Full props combining params and connectedState
type fullParams = params & connectedState & connectedDispatch;

// The component
class ChannelListComponent extends React.Component<fullParams> {
    componentDidMount() {
        // dispatch the Reload Channels action to get the channels and update the store
        this.props.reloadChannels();
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Available Channels</h3>
                </div>
                <div>
                    {this.props.channels
                        ? this.props.channels.map((channel) => (
                              <div key={channel.channelId}>
                                  {channel.displayName}
                              </div>
                          ))
                        : 'Loading...'}
                </div>
            </div>
        );
    }
}

// "Connected" wrapper for the component
export const ChannelList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChannelListComponent);
