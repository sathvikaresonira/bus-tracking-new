import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Oops!</h1>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        Something went wrong. The application encountered an unexpected error.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-8 max-w-lg w-full overflow-auto text-left">
                        <code className="text-sm text-red-500 font-mono">
                            {this.state.error?.message}
                        </code>
                    </div>
                    <Button onClick={() => window.location.reload()}>
                        Refresh Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
