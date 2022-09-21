
const createSmartLakeDeviceLog = `
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

const listSmartLakeDevices = `
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

const updateSmartLakeDevice = `
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

exports.createSmartLakeDeviceLog = createSmartLakeDeviceLog;
exports.listSmartLakeDevices = listSmartLakeDevices;
exports.updateSmartLakeDevice = updateSmartLakeDevice;