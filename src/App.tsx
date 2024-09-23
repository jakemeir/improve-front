import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/store';
import { Suspense, useEffect } from 'react';
import { getAsyncData } from './shared/store/shared.store';
import { APP_ROUTING_PATHS } from './app/constants';
import { I18Provider } from './shared/i18/i18nProvider';
import { AppLayout } from './app/AppLayout/AppLayout';
import { AppExamples } from './features/AppExamples/AppExamples';

function App() {
    const dispatcher = useAppDispatch();

    useEffect(() => {
        dispatcher(getAsyncData());
    }, [dispatcher]);

    return (
        <div className="App">
            <Suspense fallback="loading">
                <I18Provider>
                    <Routes>
                        <Route path={APP_ROUTING_PATHS.HOME} element={<AppLayout />}>
                            <Route path={APP_ROUTING_PATHS.EXAMPLES} element={<AppExamples />} />
                            <Route path="*" element={<Navigate to={APP_ROUTING_PATHS.REDIRECT} replace />} />
                            <Route
                                path={APP_ROUTING_PATHS.HOME}
                                element={<Navigate to={APP_ROUTING_PATHS.EXAMPLES} replace />}
                            />
                        </Route>
                    </Routes>
                </I18Provider>
            </Suspense>
        </div>
    );
}

export default App;
