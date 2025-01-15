import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';

//import context
import { useAuth } from '../../contexts/AuthContexts';

// Import router path
import { ROUTER_URL } from '../../const/router.path';
import { UserRole } from '../../models/modules/User';

// Import guard routes
import GuardProtectedRoute from '../protected/guard.protected.route';
import GuardPublicRoute from '../publish/guard.publish.route';

// Import layout
const AdminLayout = lazy(() => import('../../layout/admin/admin.layout'));

// Import sub paths
import { adminSubPaths } from '../protected.sub.paths/admin.sub.paths';
import { publicSubPaths } from '../publish/publish.sub.paths';
import { instructorSubPaths } from '../protected.sub.paths/instructor.sub.paths';
import { studentSubPaths } from '../protected.sub.paths/student.sub.paths';

const RunRoutes = (): JSX.Element => {
  const { role } = useAuth();

  const getDefaultPath = (role: string) => {
    switch (role) {
      case 'admin':
        return ROUTER_URL.ADMIN.BASE;
      case 'instructor':
        return ROUTER_URL.INSTRUCTOR.BASE;
      case 'student':
        return ROUTER_URL.STUDENT.BASE;
      default:
        return ROUTER_URL.COMMON.HOME;
    }
  };

  useEffect(() => {
    const currentRole = role || (localStorage.getItem('role') as UserRole);
    if (currentRole && window.location.pathname === '/') {
      const defaultPath = getDefaultPath(currentRole);
      window.location.href = defaultPath;
    }
  }, [role]);

  const renderProtectedRoutes = () => {
    const currentRole = role || (localStorage.getItem('role') as UserRole);
    // console.log("Rendering protected routes with role:", currentRole);

    if (!currentRole) {
      // console.log("No role found, protected routes will not render");
      return null;
    }

    const handleAccessDenied = () => {
      // console.error("Access denied for role:", currentRole);
      const defaultPath = getDefaultPath(currentRole);
      window.location.href = defaultPath;
    };

    return (
      <>
        <Route
          path={ROUTER_URL.ADMIN.BASE}
          element={
            <GuardProtectedRoute
              component={<AdminLayout />}
              userRole={currentRole}
              allowedRoles={['admin']}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {adminSubPaths[ROUTER_URL.ADMIN.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index} //loading index
              path={route.path?.replace('/admin/', '')} // Remove /admin/ prefix
              element={route.element}
            />
          ))}
        </Route>

        <Route
          path={ROUTER_URL.INSTRUCTOR.BASE}
          element={
            <GuardProtectedRoute
              component={<AdminLayout />}
              userRole={currentRole}
              allowedRoles={['instructor']}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {instructorSubPaths[ROUTER_URL.INSTRUCTOR.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index}
              path={!route.index ? route.path : undefined}
              element={route.element}
            />
          ))}
        </Route>

        <Route
          path={ROUTER_URL.STUDENT.BASE}
          element={
            <GuardProtectedRoute
              component={<AdminLayout />}
              userRole={currentRole}
              allowedRoles={['student']}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {studentSubPaths[ROUTER_URL.STUDENT.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index}
              path={!route.index ? route.path : undefined}
              element={route.element}
            />
          ))}
        </Route>
      </>
    );
  };

  return (
    <Routes>
      {/* Public Routes */}
      {Object.entries(publicSubPaths).map(([key, routes]) =>
        routes.map((route) => (
          <Route
            key={route.path || 'index'}
            path={route.path}
            element={
              key === ROUTER_URL.COMMON.HOME ? (
                <GuardPublicRoute component={route.element} />
              ) : (
                route.element
              )
            }
          >
            {route.children?.map((childRoute) => (
              <Route
                key={childRoute.path}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))
      )}

      {/* Protected Routes */}
      {renderProtectedRoutes()}
    </Routes>
  );
};

export default RunRoutes;
