"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  language?: "en" | "vi";
}

interface State {
  hasError: boolean;
}

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const vi = this.props.language === "vi";
      return (
        <div className="w-full h-full min-h-[320px] rounded-3xl bg-emerald-900/10 border border-white/10 flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-sm text-white/70 mb-1">
              {vi ? "Không thể tải mô hình 3D" : "3D model unavailable"}
            </p>
            <p className="text-xs text-white/40">
              {vi ? "Thử tải lại trang hoặc dùng trình duyệt hỗ trợ WebGL" : "Try refreshing or use a WebGL-capable browser"}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}