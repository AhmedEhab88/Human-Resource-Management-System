import { Route, Switch } from 'react-router-dom';

import EmployeesPage from './pages/AllEmployees';
import NewEmployeePage from './pages/NewEmployee';
import Layout from './components/layout/Layout';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <EmployeesPage />
        </Route>
        <Route path='/new-employee'>
          <NewEmployeePage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
