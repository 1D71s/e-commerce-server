import { IAccess } from '../interfaces/access.interface';
import { Endpoint } from '../enums/endpoint.enum';
import { AccessCategory } from '../enums/access-category.enum';

export const accesses: IAccess[] = [
    { title: 'View Access Permissions', category: AccessCategory.ACCESS, endpoint: Endpoint.GET_ACCESSES },

    { title: 'View Roles', category: AccessCategory.ROLES,endpoint: Endpoint.GET_ROLES },
    { title: 'Create Role', category: AccessCategory.ROLES, endpoint: Endpoint.CREATE_ROLE },
    { title: 'Update Role', category: AccessCategory.ROLES, endpoint: Endpoint.UPDATE_ROLE },
    { title: 'Delete Role', category: AccessCategory.ROLES, endpoint: Endpoint.DELETE_ROLE },

    { title: 'Upload file', category: AccessCategory.FILES, endpoint: Endpoint.UPLOAD_FILE },

    { title: 'Change User Role', category: AccessCategory.ROLES, endpoint: Endpoint.CHANGE_USER_ROLE },

    { title: 'View Users', category: AccessCategory.USERS, endpoint: Endpoint.GET_USERS },

    { title: 'Create Category', category: AccessCategory.CATEGORIES, endpoint: Endpoint.CREATE_CATEGORY },
    { title: 'Update Category', category: AccessCategory.CATEGORIES, endpoint: Endpoint.UPDATE_CATEGORY },
    { title: 'Delete Category', category: AccessCategory.CATEGORIES, endpoint: Endpoint.DELETE_CATEGORY },

    { title: 'Create Subcategory', category: AccessCategory.SUBCATEGORIES, endpoint: Endpoint.CREATE_SUB_CATEGORY },
    { title: 'Update Subcategory', category: AccessCategory.SUBCATEGORIES, endpoint: Endpoint.UPDATE_SUB_CATEGORY },
    { title: 'Delete Subcategory', category: AccessCategory.SUBCATEGORIES, endpoint: Endpoint.DELETE_SUB_CATEGORY },

    { title: 'Create Product', category: AccessCategory.PRODUCTS, endpoint: Endpoint.CREATE_PRODUCT },
    { title: 'Update Product', category: AccessCategory.PRODUCTS, endpoint: Endpoint.UPDATE_PRODUCT },
    { title: 'Delete Product', category: AccessCategory.PRODUCTS, endpoint: Endpoint.DELETE_PRODUCT },
];
