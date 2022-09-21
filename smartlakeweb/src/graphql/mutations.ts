/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSmartLakeDeviceLog = /* GraphQL */ `
  mutation CreateSmartLakeDeviceLog(
    $input: CreateSmartLakeDeviceLogInput!
    $condition: ModelSmartLakeDeviceLogConditionInput
  ) {
    createSmartLakeDeviceLog(input: $input, condition: $condition) {
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
export const updateSmartLakeDeviceLog = /* GraphQL */ `
  mutation UpdateSmartLakeDeviceLog(
    $input: UpdateSmartLakeDeviceLogInput!
    $condition: ModelSmartLakeDeviceLogConditionInput
  ) {
    updateSmartLakeDeviceLog(input: $input, condition: $condition) {
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
export const deleteSmartLakeDeviceLog = /* GraphQL */ `
  mutation DeleteSmartLakeDeviceLog(
    $input: DeleteSmartLakeDeviceLogInput!
    $condition: ModelSmartLakeDeviceLogConditionInput
  ) {
    deleteSmartLakeDeviceLog(input: $input, condition: $condition) {
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
export const createSmartLakeDevice = /* GraphQL */ `
  mutation CreateSmartLakeDevice(
    $input: CreateSmartLakeDeviceInput!
    $condition: ModelSmartLakeDeviceConditionInput
  ) {
    createSmartLakeDevice(input: $input, condition: $condition) {
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
export const updateSmartLakeDevice = /* GraphQL */ `
  mutation UpdateSmartLakeDevice(
    $input: UpdateSmartLakeDeviceInput!
    $condition: ModelSmartLakeDeviceConditionInput
  ) {
    updateSmartLakeDevice(input: $input, condition: $condition) {
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
export const deleteSmartLakeDevice = /* GraphQL */ `
  mutation DeleteSmartLakeDevice(
    $input: DeleteSmartLakeDeviceInput!
    $condition: ModelSmartLakeDeviceConditionInput
  ) {
    deleteSmartLakeDevice(input: $input, condition: $condition) {
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
