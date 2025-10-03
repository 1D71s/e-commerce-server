export enum Endpoint {
    GET_ACCESSES = 'get-accesses',

    GET_ROLES = 'get-roles',
    CREATE_ROLE = 'create-role',
    UPDATE_ROLE = 'change-role',
    DELETE_ROLE = 'delete-role',

    UPLOAD_FILE = 'upload-file',

    GET_USERS = 'get-users',

    CREATE_CATEGORY = 'create-category',
    UPDATE_CATEGORY = 'update-category',
    DELETE_CATEGORY = 'delete-category',
    GET_CATEGORIES = 'get-categories',

    CREATE_PRODUCT = 'create-product',
    UPDATE_PRODUCT = 'update-product',
    DELETE_PRODUCT = 'delete-product',

    CREATE_PRODUCT_SIZE = 'create-product-size',
    GET_PRODUCT_SIZES = 'get-product-sizes',
    DELETE_PRODUCT_SIZE = 'delete-product-size',
    UPDATE_PRODUCT_SIZE = 'update-product-size',

    GET_ADMINS = 'get-admins',
    CREATE_ADMIN = 'create-admin',
    UPDATE_ADMIN = 'update-admin',
    DELETE_ADMIN = 'delete-admin',

    GET_ORDERS = 'get-orders',
    HANDLE_ORDER = 'handle-order',
    DELETE_ORDER = 'delete-order',
}