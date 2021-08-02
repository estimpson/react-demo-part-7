import { Route, Switch, Redirect } from 'react-router';
import { ChannelList } from './app/components/Channels';
import { Home } from './app/components/Home';
import { PrinterList } from './app/components/Printers';

export const Routes = () => (
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/channels'} component={ChannelList} />
        <Route path={'/printers'} component={PrinterList} />
        <Redirect to={'/'} />
    </Switch>
);
