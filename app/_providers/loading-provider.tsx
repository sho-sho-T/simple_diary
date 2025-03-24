"use client";

import { Loading } from "@/app/_components/ui/loading";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

interface LoadingContextType {
	isLoading: boolean;
	showLoading: () => void;
	hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * ローディング状態を管理するプロバイダー
 */
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const showLoading = useCallback(() => {
		setIsLoading(true);
	}, []);

	const hideLoading = useCallback(() => {
		setIsLoading(false);
	}, []);

	const value = useMemo(
		() => ({
			isLoading,
			showLoading,
			hideLoading,
		}),
		[isLoading, showLoading, hideLoading],
	);

	return (
		<LoadingContext.Provider value={value}>
			{children}
			<Loading isLoading={isLoading} />
		</LoadingContext.Provider>
	);
};

/**
 * ローディング状態と制御用のカスタムフック
 */
export const useLoading = (): LoadingContextType => {
	const context = useContext(LoadingContext);
	if (context === undefined) {
		throw new Error("useLoading must be used within a LoadingProvider");
	}
	return context;
};
