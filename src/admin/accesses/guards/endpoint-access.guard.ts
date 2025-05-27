import { SetMetadata } from '@nestjs/common';
import { Endpoint } from '../enums/endpoint.enum';

export const EndpointAccess = (endpoint: Endpoint) => SetMetadata('endpoint', endpoint);
