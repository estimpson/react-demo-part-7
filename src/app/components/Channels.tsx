import * as React from 'react';
import * as defs from '../definitions/definitions';
import { Dispatch } from 'react';
import { Action, ActionTypes } from '../actions/actionTypes';
import { connect } from 'react-redux';
import {
    Link,
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from 'react-router-dom';
import { ViewChannel } from './ViewChannel';
import {
    Alert,
    Card,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
} from 'react-bootstrap';

// Properties received from the url
interface urlParams {
    channelId: string;
}

// React-Router interface for url props
interface params extends RouteComponentProps<urlParams> {}

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

// Generate callback(s) for the Redux store
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

// Local state for the component, in this case none
interface localState {}

// The component
class ChannelListComponent extends React.Component<fullParams, localState> {
    componentDidMount() {
        // dispatch the Reload Channels action to get the channels and update the store
        this.props.reloadChannels();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Available Channels</Card.Title>
                                {this.props.channels ? (
                                    <ListGroup>
                                        {this.props.channels.map((channel) => (
                                            <ListGroupItem
                                                key={channel.channelId}
                                            >
                                                <Row>
                                                    <Col xs={6}>
                                                        {channel.displayName}
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Link
                                                            to={`${this.props.match.url}/${channel.channelId}/view`}
                                                        >
                                                            Open
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <Card.Text>Loading...</Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Switch>
                    <Route
                        path={`${this.props.match.url}/:channelId/view`}
                        component={ViewChannel}
                    />
                    <Route
                        render={() => (
                            <Alert variant="warning">
                                Please select a Channel
                            </Alert>
                        )}
                    />
                </Switch>
                <Row>
                    <Col xs={12}>
                        <Link to="/">Return to home</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

// "Connected" wrapper for the component
export const ChannelList = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ChannelListComponent),
);
