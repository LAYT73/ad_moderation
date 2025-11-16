import { Component, type ReactNode, type ErrorInfo } from 'react';

import { httpStatusMessage } from '@/shared/api/http-status';
import { HttpError } from '@/shared/errors';

interface LocalErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface LocalErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class LocalErrorBoundary extends Component<LocalErrorBoundaryProps, LocalErrorBoundaryState> {
  state: LocalErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): LocalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error('[LOCAL BOUNDARY ERROR]', error);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      const e = this.state.error;
      let msg = 'Произошла ошибка';
      if (e instanceof HttpError) {
        msg = httpStatusMessage(e.status, e.message);
      } else if (e instanceof Error) {
        msg = e.message;
      }
      return (
        <div style={{ padding: 12, fontSize: 14 }}>
          <strong>{msg}</strong>
        </div>
      );
    }
    return this.props.children;
  }
}
