import { Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, useEffect, useRef } from 'react';
import { getUserInfo } from '../../utils/storage';
//import context
import { useAuth } from '../../contexts/AuthContexts';
// Import router path
import { ROUTER_URL } from '../../const/router.path';
import { UserRole } from '../../app/enums/user.enum';

// Import guard routes
import GuardProtectedRoute from '../protected/guard.protected.route';
import GuardPublicRoute from '../publish/guard.publish.route';

// Import layout
const AdminLayout = lazy(() => import('../../layout/admin/admin.layout'));
const CustomerLayout = lazy(
  () => import('../../layout/customer/customer.layout')
);
const StaffLayout = lazy(() => import('../../layout/staff/staff_layout'));
// Import sub paths
import { adminSubPaths } from '../protected.sub.paths/admin.sub.paths';
import { publicSubPaths } from '../publish/publish.sub.paths';
import { staffSubPaths } from '../protected.sub.paths/staff.sub.paths';
import { customerSubPaths } from '../protected.sub.paths/customer.sub.paths';

//import respone userInfo
import { userInfo } from '../../models/api/response/auth.res.model';

const RunRoutes = (): JSX.Element => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const getDefaultPath = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return ROUTER_URL.ADMIN.BASE;
      case UserRole.CUSTOMER:
        return ROUTER_URL.CUSTOMER.BASE;
      case UserRole.STAFF:
        return ROUTER_URL.STAFF.BASE;
      default:
        return ROUTER_URL.COMMON.HOME;
    }
  };

  useEffect(() => {
    const userInfo = getUserInfo() as userInfo;
    const currentRole = role || (userInfo?.role as UserRole);

    // Chỉ chuyển hướng nếu role có giá trị và không ở trang public
    if (
      currentRole &&
      window.location.pathname !== '/'
      // !publicSubPaths[window.location.pathname]
    ) {
      const defaultPath = getDefaultPath(currentRole);
      if (defaultPath !== ROUTER_URL.COMMON.HOME) {
        navigate(defaultPath);
      }
    }
  }, [role]);

  const renderProtectedRoutes = () => {
    const currentRole = role || (getUserInfo()?.role as UserRole);

    // Use a ref to store the navigation path
    const navigatePathRef = useRef<string | null>(null);

    const handleAccessDenied = () => {
      if (currentRole) {
        const defaultPath = getDefaultPath(currentRole);
        console.log('Default Path:', defaultPath);
        navigatePathRef.current = defaultPath;
      } else {
        navigatePathRef.current = ROUTER_URL.LOGIN;
      }
    };

    // Use useEffect to perform navigation after rendering
    useEffect(() => {
      if (navigatePathRef.current) {
        navigate(navigatePathRef.current);
        navigatePathRef.current = null; // Reset the ref after navigation
      }
    }, [navigatePathRef.current]);

    return (
      <>
        <Route
          path={ROUTER_URL.ADMIN.BASE}
          element={
            <GuardProtectedRoute
              component={<AdminLayout />}
              userRole={currentRole}
              allowedRoles={['ROLE_ADMIN']}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {adminSubPaths[ROUTER_URL.ADMIN.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        <Route
          path={ROUTER_URL.STAFF.BASE}
          element={
            <GuardProtectedRoute
              component={<StaffLayout />}
              userRole={currentRole}
              allowedRoles={['ROLE_STAFF']}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {staffSubPaths[ROUTER_URL.STAFF.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index} //loading index
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        <Route
          path={ROUTER_URL.CUSTOMER.BASE}
          element={
            <GuardProtectedRoute
              component={<CustomerLayout />}
              userRole={currentRole}
              allowedRoles={['ROLE_CUSTOMER']}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {customerSubPaths[ROUTER_URL.CUSTOMER.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index} //loading index
              path={route.path}
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
        routes.map((route, index) => (
          <Route
            key={`${route.path || 'index'}-${index}`}
            path={route.path}
            element={
              key === ROUTER_URL.COMMON.HOME ? (
                <GuardPublicRoute component={route.element} />
              ) : (
                route.element
              )
            }
          >
            {route.children?.map((childRoute, childIndex) => (
              <Route
                key={`${childRoute.path}-${childIndex}`}
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
