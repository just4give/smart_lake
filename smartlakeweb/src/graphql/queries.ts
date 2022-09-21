/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSmartLakeDeviceLog = /* GraphQL */ `
  query GetSmartLakeDeviceLog($id: ID!) {
    getSmartLakeDeviceLog(id: $id) {
      id
      dev_eui
      temperature
      tds
      ph
      turbidity
      light
      uv
      seq
      clas
      bat
      ts
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const listSmartLakeDeviceLogs = /* GraphQL */ `
  query ListSmartLakeDeviceLogs(
    $filter: ModelSmartLakeDeviceLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSmartLakeDeviceLogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dev_eui
        temperature
        tds
        ph
        turbidity
        light
        uv
        seq
        clas
        bat
        ts
        ttl
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSmartLakeDevice = /* GraphQL */ `
  query GetSmartLakeDevice($id: ID!) {
    getSmartLakeDevice(id: $id) {
      id
      dev_eui
      temperature
      tds
      ph
      turbidity
      light
      uv
      seq
      clas
      bat
      lat
      lng
      ts
      mobiles
      createdAt
      updatedAt
    }
  }
`;
export const listSmartLakeDevices = /* GraphQL */ `
  query ListSmartLakeDevices(
    $filter: ModelSmartLakeDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSmartLakeDevices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dev_eui
        temperature
        tds
        ph
        turbidity
        light
        uv
        seq
        clas
        bat
        lat
        lng
        ts
        mobiles
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
