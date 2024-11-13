import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

const App = () => {
	return (
		<div className="">
			<Router>
				<AppRoutes />
			</Router>
		</div>
	);
};
export default App;
