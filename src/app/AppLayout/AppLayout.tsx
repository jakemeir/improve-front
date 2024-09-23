import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { LanguageSelector } from '../../features/LanguageSelector/LanguageSelector';
import './AppLayout.scss';

export const AppLayout: FunctionComponent = () => {
    return (
        <div className="layout-container">
            <LanguageSelector />
            <div className="main-layout">
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
