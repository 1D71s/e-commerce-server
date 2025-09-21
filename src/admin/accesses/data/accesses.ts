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

    { title: 'View Users', category: AccessCategory.USERS, endpoint: Endpoint.GET_USERS },

    { title: 'Create Category', category: AccessCategory.CATEGORIES, endpoint: Endpoint.CREATE_CATEGORY },
    { title: 'Update Category', category: AccessCategory.CATEGORIES, endpoint: Endpoint.UPDATE_CATEGORY },
    { title: 'Delete Category', category: AccessCategory.CATEGORIES, endpoint: Endpoint.DELETE_CATEGORY },
    { title: 'Get Categories', category: AccessCategory.CATEGORIES, endpoint: Endpoint.GET_CATEGORIES },

    { title: 'Create Product', category: AccessCategory.PRODUCTS, endpoint: Endpoint.CREATE_PRODUCT },
    { title: 'Update Product', category: AccessCategory.PRODUCTS, endpoint: Endpoint.UPDATE_PRODUCT },
    { title: 'Delete Product', category: AccessCategory.PRODUCTS, endpoint: Endpoint.DELETE_PRODUCT },

    { title: 'View Admins', category: AccessCategory.ADMINS, endpoint: Endpoint.GET_ADMINS },
    { title: "Create admin", category: AccessCategory.ADMINS, endpoint: Endpoint.CREATE_ADMIN },
    { title: "Update admin", category: AccessCategory.ADMINS, endpoint: Endpoint.UPDATE_ADMIN },
    { title: "Delete admin", category: AccessCategory.ADMINS, endpoint: Endpoint.DELETE_ADMIN},

    { title: "Get orders", category: AccessCategory.ORDERS, endpoint: Endpoint.GET_ORDERS},
    { title: "Handle order", category: AccessCategory.ORDERS, endpoint: Endpoint.HANDLE_ORDER},
    { title: "Delete order", category: AccessCategory.ORDERS, endpoint: Endpoint.DELETE_ORDER},

    { title: "Get product sizes", category: AccessCategory.PRODUCTS, endpoint: Endpoint.GET_PRODUCT_SIZES},
    { title: "Create product size", category: AccessCategory.PRODUCTS, endpoint: Endpoint.CREATE_PRODUCT_SIZE},
    { title: "Delete product size", category: AccessCategory.PRODUCTS, endpoint: Endpoint.DELETE_PRODUCT_SIZE},
];
