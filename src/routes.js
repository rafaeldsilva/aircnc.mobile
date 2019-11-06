import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login/Login';
import List from './pages/List/List';
import Book from './pages/Book/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book 
    })
);

export default Routes;