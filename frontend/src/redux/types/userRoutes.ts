import { UserRole } from "../../enum";

export type UserRoutes = {
  [UserRole.HR]: Array<{
    path: string;
    element: JSX.Element;
    children?: Array<{
      path: string;
      element: JSX.Element;
    }>;
  }>;
  [UserRole.Manager]: Array<{
    path: string;
    element: JSX.Element;
    children?: Array<{
      path: string;
      element: JSX.Element;
    }>;
  }>;
  [UserRole.User]: Array<{
    path: string;
    element: JSX.Element;
    children?: Array<{
      path: string;
      element: JSX.Element;
    }>;
  }>;
};
