# koishi-plugin-milvus

[![npm](https://img.shields.io/npm/v/koishi-plugin-milvus?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-milvus)

向量数据库 milvus 服务

## 配置项

- `host`: IP 地址/域名, 默认 localhost
- `port`: 端口, 默认 19530
- `username?`: 用户名
- `password?`: 密码


## 示例

```typescript
export const inject = ["milvus"];

// 定义 Schema
const collection_name = `hello_milvus`;
const schema = [
  {
    name: "age",
    description: "ID field",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: true,
  },
  {
    name: "vector",
    description: "Vector field",
    data_type: DataType.FloatVector,
    dim: 8,
  },
  { name: "height", description: "int64 field", data_type: DataType.Int64 },
  {
    name: "name",
    description: "VarChar field",
    data_type: DataType.VarChar,
    max_length: 128,
  },
];

// 创建集合
await ctx.milvus.createCollection({
  collection_name,
  fields: schema,
});
```

## 参见

- [Milvus](https://github.com/milvus-io/milvus)
- [Milvus2-sdk-node](https://github.com/milvus-io/milvus-sdk-node)
- [Milvus2-sdk-node Official Docs](https://milvus.io/api-reference/node/v2.5.x/About.md)
