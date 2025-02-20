import { Route, Routes, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { getUserInfo } from '../../utils/storage';
//import context
import { useAuth } from '../../contexts/AuthContexts';
// Import router path
import { ROUTER_URL } from '../../const/router.path';
import { UserRole } from '../../app/enums/user.role';

// Import guard routes
import GuardProtectedRoute from '../protected/guard.protected.route';
import GuardPublicRoute from '../publish/guard.publish.route';

// Import layout
const AdminLayout = lazy(() => import('../../layout/admin/admin.layout'));
const CustomerLayout = lazy(() => import('../../layout/customer/customer_layout'));
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
  console.log('Role:', role);
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
    console.log('Current Role:', currentRole);
  
    // Chỉ chuyển hướng nếu role có giá trị và không ở trang public
    if (currentRole && window.location.pathname === '/' && !publicSubPaths[window.location.pathname]) {
      const defaultPath = getDefaultPath(currentRole);
      if (defaultPath !== ROUTER_URL.COMMON.HOME) {
        window.location.href = defaultPath;
      }
    }
  }, [role]);
  
  

  const renderProtectedRoutes = () => {
    const currentRole = role || (getUserInfo()?.role as UserRole);

    const handleAccessDenied = () => {
      if (currentRole) {
        const defaultPath = getDefaultPath(currentRole);
        console.log('Default Path:', defaultPath);
        window.location.href = defaultPath;
      } else {
        window.location.href = ROUTER_URL.COMMON.HOME;
      }
    };

    return (
      <>
        <Route
          path={ROUTER_URL.ADMIN.BASE}
          element={
            <GuardProtectedRoute
              component={<AdminLayout />}
              userRole={currentRole}
              allowedRoles={[UserRole.ADMIN]}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {adminSubPaths[ROUTER_URL.ADMIN.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index}
              path={route.path?.replace(ROUTER_URL.ADMIN.BASE, '')}
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
              allowedRoles={[UserRole.STAFF]}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {staffSubPaths[ROUTER_URL.STAFF.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index}
              path={!route.index ? route.path?.replace(ROUTER_URL.STAFF.BASE, '') : undefined}
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
              allowedRoles={[UserRole.CUSTOMER]}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {customerSubPaths[ROUTER_URL.CUSTOMER.BASE]?.map((route) => (
            <Route
              key={route.path || 'index'}
              index={route.index}
              path={!route.index ? route.path?.replace(ROUTER_URL.CUSTOMER.BASE, '') : undefined}
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
              key === ROUTER_URL.COMMON.HOME
                ? <GuardPublicRoute component={route.element} />
                : route.element
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
