import AppProvider from '@/contexts/AppContext';
import GlobalStyles from '@/styles/global.styles';
import StyledComponentsRegistry from './registry';

export const metadata = {
	title: 'Eversun Test',
	description: 'Eversun Test',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<StyledComponentsRegistry>
					<GlobalStyles />
					<AppProvider>{children}</AppProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
