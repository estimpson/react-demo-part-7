import { Route, Switch, Redirect } from 'react-router';
import { ChannelList } from './app/components/Channels';
import { Home } from './app/components/Home';

export const Routes = () => (
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/channels'} component={ChannelList} />
        <Redirect to={'/'} />
    </Switch>
);
