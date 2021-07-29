import * as React from 'react';
import * as defs from '../definitions/definitions';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { Action } from '../actions/actionTypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Properties received from the url
interface urlParams {
    channelId: string;
}

// React-Router interface for url props
interface params extends RouteComponentProps<urlParams> {}

// Data to be received from the Redux store
interface connectedState {
    channel: defs.Channel | null;
}

// Callback methods for actions to be dispatched, in this case none
interface connectedDispatch {}

// Map the Redux store to the connectedState
const mapStateToProps = (
    state: defs.State,
    ownProps: params,
): connectedState => {
    //select the specific channel from redux matching the channelId route parameter
    if (state.channels) {
        const channelId = parseInt(ownProps.match.params.channelId);

        //Note: Array.prototype.find( ... ) requires a polyfill for internet explorer
        const channel = state.channels.find(
            (channel) => channel.channelId === channelId,
        );

        if (channel) {
            return {
                channel,
            };
        }
    }

    return {
        channel: null,
    };
};

// Generate callback(s) for the Redux store, in this case none
const mapDispatchToProps = (
    dispatch: Dispatch<Action>,
): connectedDispatch => ({});

// Full props combining params and connectedState
type fullParams = params & connectedState & connectedDispatch;

// Local state for the component, in this case none
interface localState {}

// The component
class ViewChannelComponent extends React.Component<fullParams, localState> {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Channel Id: {this.props.match.params.channelId}
                            </Card.Title>
                            {this.props.channel ? (
                                <div>
                                    Channel Name:{' '}
                                    {this.props.channel.displayName}
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                            <Link to="/channels">Close using a link</Link>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                onClick={(e) => {
                                    this.props.history.push('/channels');
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                                <span className="ms-1">Close</span>
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}

// "Connected" wrapper for the component
export const ViewChannel = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewChannelComponent);
