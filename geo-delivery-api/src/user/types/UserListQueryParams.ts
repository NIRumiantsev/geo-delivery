import { UserRole } from './UserRole';

export type UserListQueryParams = {
  usersPerPage?: string,
  pageNumber?: string,
  userRole?: keyof typeof UserRole,
}