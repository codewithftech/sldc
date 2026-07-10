import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    description?: string;
    typeof?: string;
    about?: string;
  }

  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    description?: string;
  }

  interface NavHTMLAttributes<T> extends HTMLAttributes<T> {
    description?: string;
  }
}
