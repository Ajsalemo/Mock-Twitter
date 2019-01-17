import { ApolloServer, gql, AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';