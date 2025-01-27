// import { useSelector } from "react-redux"
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const LoggedInRoute = ({ children }) => {
  const check = localStorage.getItem('token')
  const location = useLocation()

  if (check) {
    return <>{children}</>
  } else if (!check) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }
}

export const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.AuthReducer.user)
  const isAdmin = user.roleId
  const location = useLocation()
  const check = localStorage.getItem('token')

  if (isAdmin == 1) {
    return <>{children}</>
  } else if (isAdmin == 2) {
    return <Navigate to="/dashboard/product-list?pa=1" />
  } else if (isAdmin == 3) {
    return <Navigate to="/" />
  } else if (!check) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }
}

export const AdminBiasaRoute = ({ children }) => {
  const user = useSelector((state) => state.AuthReducer.user)
  const isAdmin = user.roleId
  const location = useLocation()
  const check = localStorage.getItem('token')

  if (isAdmin == 2 || isAdmin == 1) {
    return <>{children}</>
  } else if (isAdmin == 3) {
    return <Navigate to="/" />
  } else if (!check) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }
}

export const LoggedOutRoute = ({ children }) => {
  const check = localStorage.getItem('token')
  if (check) {
    return <Navigate to="/" />
  } else {
    return <>{children}</>
  }
}
