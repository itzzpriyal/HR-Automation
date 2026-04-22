import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
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
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 bg-canvas text-center">
          <div className="w-16 h-16 bg-node-end/10 rounded-full flex items-center justify-center mb-6">
            <AlertCircle size={32} className="text-node-end" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            The application encountered an unexpected error. This might be due to an invalid workflow state or a rendering issue.
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Reload Application
            </Button>
            <Button 
              variant="secondary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
          </div>
          {this.state.error && (
            <pre className="mt-8 p-4 bg-panel border border-border rounded-lg text-left text-[10px] font-mono text-node-end overflow-auto max-w-2xl w-full">
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
