import { AccessInterface } from '../interfaces/access.interface';
import { Endpoint } from '../enums/endpoint.enum';

export const accesses: AccessInterface[] = [
    { title: 'View Access Permissions', endpoint: Endpoint.GET_ACCESS },

    { title: 'View Roles', endpoint: Endpoint.GET_ROLES },
    { title: 'Create Role', endpoint: Endpoint.CREATE_ROLE },
    { title: 'Update Role', endpoint: Endpoint.CHANGE_ROLE },
    { title: 'Delete Role', endpoint: Endpoint.DELETE_ROLE },

    { title: 'Upload file', endpoint: Endpoint.UPLOAD_FILE },

    { title: 'Change User Role', endpoint: Endpoint.CHANGE_USER_ROLE },

    { title: 'View Users', endpoint: Endpoint.GET_USERS },

    { title: 'Create Category', endpoint: Endpoint.CREATE_CATEGORY },
    { title: 'Update Category', endpoint: Endpoint.UPDATE_CATEGORY },
    { title: 'Delete Category', endpoint: Endpoint.DELETE_CATEGORY },

    { title: 'Create Subcategory', endpoint: Endpoint.CREATE_SUB_CATEGORY },
    { title: 'Update Subcategory', endpoint: Endpoint.UPDATE_SUB_CATEGORY },
    { title: 'Delete Subcategory', endpoint: Endpoint.DELETE_SUB_CATEGORY },

    { title: 'Create Product', endpoint: Endpoint.CREATE_PRODUCT },
    { title: 'Update Product', endpoint: Endpoint.UPDATE_PRODUCT },
    { title: 'Delete Product', endpoint: Endpoint.DELETE_PRODUCT },
];
