/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSmartLakeDeviceLogInput = {
  id?: string | null,
  dev_eui: string,
  temperature?: number | null,
  tds?: number | null,
  ph?: number | null,
  turbidity?: number | null,
  light?: number | null,
  uv?: number | null,
  seq?: number | null,
  clas?: number | null,
  bat?: number | null,
  ts: number,
  ttl: number,
};

export type ModelSmartLakeDeviceLogConditionInput = {
  dev_eui?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  tds?: ModelFloatInput | null,
  ph?: ModelFloatInput | null,
  turbidity?: ModelFloatInput | null,
  light?: ModelFloatInput | null,
  uv?: ModelFloatInput | null,
  seq?: ModelIntInput | null,
  clas?: ModelIntInput | null,
  bat?: ModelFloatInput | null,
  ts?: ModelIntInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelSmartLakeDeviceLogConditionInput | null > | null,
  or?: Array< ModelSmartLakeDeviceLogConditionInput | null > | null,
  not?: ModelSmartLakeDeviceLogConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type SmartLakeDeviceLog = {
  __typename: "SmartLakeDeviceLog",
  id: string,
  dev_eui: string,
  temperature?: number | null,
  tds?: number | null,
  ph?: number | null,
  turbidity?: number | null,
  light?: number | null,
  uv?: number | null,
  seq?: number | null,
  clas?: number | null,
  bat?: number | null,
  ts: number,
  ttl: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSmartLakeDeviceLogInput = {
  id: string,
  dev_eui?: string | null,
  temperature?: number | null,
  tds?: number | null,
  ph?: number | null,
  turbidity?: number | null,
  light?: number | null,
  uv?: number | null,
  seq?: number | null,
  clas?: number | null,
  bat?: number | null,
  ts?: number | null,
  ttl?: number | null,
};

export type DeleteSmartLakeDeviceLogInput = {
  id: string,
};

export type CreateSmartLakeDeviceInput = {
  id?: string | null,
  dev_eui: string,
  temperature?: number | null,
  tds?: number | null,
  ph?: number | null,
  turbidity?: number | null,
  light?: number | null,
  uv?: number | null,
  seq?: number | null,
  clas?: number | null,
  bat?: number | null,
  lat?: number | null,
  lng?: number | null,
  ts: number,
  mobiles?: Array< string | null > | null,
};

export type ModelSmartLakeDeviceConditionInput = {
  dev_eui?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  tds?: ModelFloatInput | null,
  ph?: ModelFloatInput | null,
  turbidity?: ModelFloatInput | null,
  light?: ModelFloatInput | null,
  uv?: ModelFloatInput | null,
  seq?: ModelIntInput | null,
  clas?: ModelIntInput | null,
  bat?: ModelFloatInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  ts?: ModelIntInput | null,
  mobiles?: ModelStringInput | null,
  and?: Array< ModelSmartLakeDeviceConditionInput | null > | null,
  or?: Array< ModelSmartLakeDeviceConditionInput | null > | null,
  not?: ModelSmartLakeDeviceConditionInput | null,
};

export type SmartLakeDevice = {
  __typename: "SmartLakeDevice",
  id: string,
  dev_eui: string,
  temperature?: number | null,
  tds?: number | null,
  ph?: number | null,
  turbidity?: number | null,
  light?: number | null,
  uv?: number | null,
  seq?: number | null,
  clas?: number | null,
  bat?: number | null,
  lat?: number | null,
  lng?: number | null,
  ts: number,
  mobiles?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSmartLakeDeviceInput = {
  id: string,
  dev_eui?: string | null,
  temperature?: number | null,
  tds?: number | null,
  ph?: number | null,
  turbidity?: number | null,
  light?: number | null,
  uv?: number | null,
  seq?: number | null,
  clas?: number | null,
  bat?: number | null,
  lat?: number | null,
  lng?: number | null,
  ts?: number | null,
  mobiles?: Array< string | null > | null,
};

export type DeleteSmartLakeDeviceInput = {
  id: string,
};

export type ModelSmartLakeDeviceLogFilterInput = {
  id?: ModelIDInput | null,
  dev_eui?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  tds?: ModelFloatInput | null,
  ph?: ModelFloatInput | null,
  turbidity?: ModelFloatInput | null,
  light?: ModelFloatInput | null,
  uv?: ModelFloatInput | null,
  seq?: ModelIntInput | null,
  clas?: ModelIntInput | null,
  bat?: ModelFloatInput | null,
  ts?: ModelIntInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelSmartLakeDeviceLogFilterInput | null > | null,
  or?: Array< ModelSmartLakeDeviceLogFilterInput | null > | null,
  not?: ModelSmartLakeDeviceLogFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSmartLakeDeviceLogConnection = {
  __typename: "ModelSmartLakeDeviceLogConnection",
  items:  Array<SmartLakeDeviceLog | null >,
  nextToken?: string | null,
};

export type ModelSmartLakeDeviceFilterInput = {
  id?: ModelIDInput | null,
  dev_eui?: ModelStringInput | null,
  temperature?: ModelFloatInput | null,
  tds?: ModelFloatInput | null,
  ph?: ModelFloatInput | null,
  turbidity?: ModelFloatInput | null,
  light?: ModelFloatInput | null,
  uv?: ModelFloatInput | null,
  seq?: ModelIntInput | null,
  clas?: ModelIntInput | null,
  bat?: ModelFloatInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  ts?: ModelIntInput | null,
  mobiles?: ModelStringInput | null,
  and?: Array< ModelSmartLakeDeviceFilterInput | null > | null,
  or?: Array< ModelSmartLakeDeviceFilterInput | null > | null,
  not?: ModelSmartLakeDeviceFilterInput | null,
};

export type ModelSmartLakeDeviceConnection = {
  __typename: "ModelSmartLakeDeviceConnection",
  items:  Array<SmartLakeDevice | null >,
  nextToken?: string | null,
};

export type CreateSmartLakeDeviceLogMutationVariables = {
  input: CreateSmartLakeDeviceLogInput,
  condition?: ModelSmartLakeDeviceLogConditionInput | null,
};

export type CreateSmartLakeDeviceLogMutation = {
  createSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSmartLakeDeviceLogMutationVariables = {
  input: UpdateSmartLakeDeviceLogInput,
  condition?: ModelSmartLakeDeviceLogConditionInput | null,
};

export type UpdateSmartLakeDeviceLogMutation = {
  updateSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSmartLakeDeviceLogMutationVariables = {
  input: DeleteSmartLakeDeviceLogInput,
  condition?: ModelSmartLakeDeviceLogConditionInput | null,
};

export type DeleteSmartLakeDeviceLogMutation = {
  deleteSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSmartLakeDeviceMutationVariables = {
  input: CreateSmartLakeDeviceInput,
  condition?: ModelSmartLakeDeviceConditionInput | null,
};

export type CreateSmartLakeDeviceMutation = {
  createSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSmartLakeDeviceMutationVariables = {
  input: UpdateSmartLakeDeviceInput,
  condition?: ModelSmartLakeDeviceConditionInput | null,
};

export type UpdateSmartLakeDeviceMutation = {
  updateSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSmartLakeDeviceMutationVariables = {
  input: DeleteSmartLakeDeviceInput,
  condition?: ModelSmartLakeDeviceConditionInput | null,
};

export type DeleteSmartLakeDeviceMutation = {
  deleteSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSmartLakeDeviceLogQueryVariables = {
  id: string,
};

export type GetSmartLakeDeviceLogQuery = {
  getSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSmartLakeDeviceLogsQueryVariables = {
  filter?: ModelSmartLakeDeviceLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSmartLakeDeviceLogsQuery = {
  listSmartLakeDeviceLogs?:  {
    __typename: "ModelSmartLakeDeviceLogConnection",
    items:  Array< {
      __typename: "SmartLakeDeviceLog",
      id: string,
      dev_eui: string,
      temperature?: number | null,
      tds?: number | null,
      ph?: number | null,
      turbidity?: number | null,
      light?: number | null,
      uv?: number | null,
      seq?: number | null,
      clas?: number | null,
      bat?: number | null,
      ts: number,
      ttl: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSmartLakeDeviceQueryVariables = {
  id: string,
};

export type GetSmartLakeDeviceQuery = {
  getSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSmartLakeDevicesQueryVariables = {
  filter?: ModelSmartLakeDeviceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSmartLakeDevicesQuery = {
  listSmartLakeDevices?:  {
    __typename: "ModelSmartLakeDeviceConnection",
    items:  Array< {
      __typename: "SmartLakeDevice",
      id: string,
      dev_eui: string,
      temperature?: number | null,
      tds?: number | null,
      ph?: number | null,
      turbidity?: number | null,
      light?: number | null,
      uv?: number | null,
      seq?: number | null,
      clas?: number | null,
      bat?: number | null,
      lat?: number | null,
      lng?: number | null,
      ts: number,
      mobiles?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSmartLakeDeviceLogSubscription = {
  onCreateSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSmartLakeDeviceLogSubscription = {
  onUpdateSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSmartLakeDeviceLogSubscription = {
  onDeleteSmartLakeDeviceLog?:  {
    __typename: "SmartLakeDeviceLog",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    ts: number,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSmartLakeDeviceSubscription = {
  onCreateSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSmartLakeDeviceSubscription = {
  onUpdateSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSmartLakeDeviceSubscription = {
  onDeleteSmartLakeDevice?:  {
    __typename: "SmartLakeDevice",
    id: string,
    dev_eui: string,
    temperature?: number | null,
    tds?: number | null,
    ph?: number | null,
    turbidity?: number | null,
    light?: number | null,
    uv?: number | null,
    seq?: number | null,
    clas?: number | null,
    bat?: number | null,
    lat?: number | null,
    lng?: number | null,
    ts: number,
    mobiles?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
