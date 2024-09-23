import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import reactExampleReducer from '../features/AppExamples/components/AppExample2/AppExample2.slice';
import { sharedStoreReducer } from '../shared/store/shared.store';
import { authReducer } from './Auth/Auth.store';

export const store = configureStore({
    reducer: {
        counter: reactExampleReducer,
        sharedStoreReducer,
        authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
