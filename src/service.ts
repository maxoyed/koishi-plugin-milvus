import { Context, Service } from "koishi";
import {
  CreateColReq,
  CreateCollectionReq,
  CreateIndexReq,
  CreateIndexSimpleReq,
  InsertReq,
  LoadCollectionReq,
  MilvusClient,
  SearchReq,
  SearchSimpleReq,
} from "@zilliz/milvus2-sdk-node";
import { Config } from ".";

declare module "koishi" {
  interface Context {
    milvus: MilvusService;
  }
}

export class MilvusService extends Service {
  private client: MilvusClient;
  constructor(ctx: Context, config: Config) {
    super(ctx, "milvus");
    this.client = new MilvusClient({
      address: `${config.host}:${config.port}`,
      username: config.username,
      password: config.password,
    });
  }

  /**
   * 创建集合
   * @param data
   * @returns
   */
  async createCollection(data: CreateColReq | CreateCollectionReq) {
    return await this.client.createCollection(data);
  }

  /**
   * 向集合插入数据
   * @param data
   * @returns
   */
  async insert(data: InsertReq) {
    return await this.client.insert(data);
  }

  /**
   * 创建索引
   * @param data
   * @returns
   */
  async createIndex(data: CreateIndexReq | CreateIndexSimpleReq) {
    return await this.client.createIndex(data);
  }

  /**
   * 将集合载入内存
   * @param data
   * @returns
   */
  async loadCollectionSync(data: LoadCollectionReq) {
    return await this.client.loadCollectionSync(data);
  }

  /**
   * 向量搜索
   * @param data
   * @returns
   */
  async search(data: SearchReq | SearchSimpleReq) {
    return await this.client.search(data);
  }

  /**
   * 健康检查
   * @returns
   */
  async checkHealth() {
    return await this.client.checkHealth();
  }
}
